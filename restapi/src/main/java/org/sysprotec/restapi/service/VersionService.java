package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.settings.Version;
import org.sysprotec.restapi.model.settings.VersionStation;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.settings.VersionRepository;
import org.sysprotec.restapi.repository.settings.VersionStationRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class VersionService {

    private final VersionRepository versionRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final VersionStationRepository versionStationRepository;
    private final StationService stationService;
    private final StationRepository stationRepository;


    public List<Version> getVersions() {
        List<Version> versions = new ArrayList<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                if(user.getActiveProject() != null && user.getActiveProject()>0){
                    versions = versionRepository.findVersionsByProjectIdOrderByIdAsc(user.getActiveProject());
                    for(Version version : versions){
                        List<VersionStation> versionStation = versionStationRepository.findVersionStationsByVersionIdOrderByIdAsc(version.getId());
                        version.setVersionStation(versionStation);
                    }
                    return versions;
                }
            }
        }
        return versions;
    }

    public Version addVersion(Version version) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                if (optionalProject.isEmpty()) {
                    log.error("Project with ID" + user.getActiveProject() + " does not exist in database");
                } else {
                    Optional<Version> versionOptional = versionRepository.findVersionByVersionAndProjectId(
                            version.getVersion(),
                            optionalProject.get().getId());
                    if(versionOptional.isEmpty()){
                        Version saveVersion = Version.builder()
                                .version(version.getVersion())
                                .toDo(version.getToDo())
                                .done(version.getDone())
                                .date(version.getDate())
                                .project(optionalProject.get())
                                .build();

                        //save Version so versionStations can be added to it
                        Version newVersion = versionRepository.save(saveVersion);
                        List<VersionStation> saveVersionStation = new ArrayList<>();

                        //create and add versionStations to Version
                        List<Station> stationList = stationRepository.findByProjectIdOrderByNameAsc(optionalProject.get().getId());
                        for (Station station : stationList) {
                            VersionStation newVersionStation = VersionStation.builder()
                                    .state(1)
                                    .stationName(station.getName())
                                    .version(newVersion)
                                    .build();
                            saveVersionStation.add(newVersionStation);
                            versionStationRepository.save(newVersionStation);
                            log.info("Version '" + version.getVersion() + "' added to Station '" + station.getName() + "'");
                        }

                        //set the versionStations to Version, so we can return it - otherwise versionStation is null
                        saveVersion.setVersionStation(saveVersionStation);

                        //add Version to the project
                        Project saveProject = optionalProject.get();
                        List<Version> projectVersion = optionalProject.get().getVersions();
                        projectVersion.add(saveVersion);
                        saveProject.setVersions(projectVersion);
                        projectRepository.save(saveProject);

                        log.info("Version '" + version.getVersion() + "' added to Project '" + saveProject.getName() + "'");
                        Optional<Version> returnVersion = versionRepository.findVersionByVersionAndProjectId(
                                saveVersion.getVersion(),
                                saveProject.getId());
                        if(returnVersion.isPresent()){
                            return returnVersion.get();
                        } else {
                            log.error("Version '" + version.getVersion() + "' not found in project '" + saveProject.getName() + "'");
                        }
                    } else {
                        log.error("Version "+ version.getVersion() + " does already exist in this project");
                    }
                }
            }
        }
        return null;
    }

    public ResponseEntity<Version> updateVersion(Version version) {
        Optional<Version> optionalVersion = versionRepository.findVersionById(version.getId());
        if(optionalVersion.isEmpty()){
            log.error("Version "+ version.getVersion() + " does not exist in database");
            return new ResponseEntity<>(
                    HttpStatus.CONFLICT);
        } else {
            Optional<Version> checkVersion = versionRepository.findVersionByVersionAndProjectId(
                    version.getVersion(),
                    optionalVersion.get().getProject().getId());

            if(checkVersion.isEmpty() || Objects.equals(version.getVersion(), optionalVersion.get().getVersion())){
                Version saveVersion = optionalVersion.get();
                saveVersion.setVersion(version.getVersion());
                saveVersion.setToDo(version.getToDo());
                saveVersion.setDate(version.getDate());

                //check if all stations are done
                saveVersion.setDone(true);

                if(version.getVersionStation() != null){
                    if(!version.getVersionStation().isEmpty()){
                        List<VersionStation> versionStationList = version.getVersionStation();
                        for(VersionStation versionStation : versionStationList){
                            Optional<VersionStation> optionalVersionStation = versionStationRepository.findById(versionStation.getId());
                            if(optionalVersionStation.isPresent()){
                                optionalVersionStation.get().setState(versionStation.getState());
                                //check if all stations are done
                                if(optionalVersionStation.get().getState() == 1){
                                    saveVersion.setDone(false);
                                }
                            }
                        }
                    }
                }
                versionRepository.save(saveVersion);
                log.info("Version '"+ version.getVersion() + "' updated");
                stationService.updateStationVersion();
                if(versionRepository.findVersionById(version.getId()).isPresent()){
                    Version returnVersion = versionRepository.findVersionById(version.getId()).get();
                    returnVersion.setVersionStation(versionStationRepository.findVersionStationsByVersionIdOrderByIdAsc(returnVersion.getId()));
                    return new ResponseEntity<>(
                            returnVersion,
                            HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(
                            HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                log.error("Version "+ version.getVersion() + " does already exist in this project");
                return new ResponseEntity<>(
                        HttpStatus.CONFLICT);
            }
        }
    }

    public void deleteVersion(Long versionId) {
        Optional<Project> optionalProject = projectRepository.findProjectByVersionsId(versionId);
        Optional<Version> optionalVersion = versionRepository.findVersionById(versionId);
        if(optionalVersion.isEmpty() || optionalProject.isEmpty()){
            log.error("Version with ID '"+ versionId + "' does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            saveProject.removeVersion(versionId);
            versionRepository.deleteById(versionId);
            log.info("Version '" + optionalVersion.get().getVersion() + "' deleted");
        }
    }
}
