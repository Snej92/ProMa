package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.VersionRepository;
import org.sysprotec.restapi.repository.VersionStationRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class VersionService {

    private final VersionRepository versionRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final VersionStationRepository versionStationRepository;


    public List<Version> getVersions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                if(user.getActiveProject() != null && user.getActiveProject()>0){
                    List<Version> versions = versionRepository.findVersionsByProjectIdOrderByVersionAsc(user.getActiveProject());
                    for(Version version : versions){
                        List<VersionStation> versionStation = versionStationRepository.findVersionStationsByVersionIdOrderByIdAsc(version.getId());
                        version.setVersionStation(versionStation);
                    }
                    return versions;
                }
            }
        }
        return null;
    }

    public void addVersion(Version version) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                if (optionalProject.isEmpty()) {
                    log.error("Project with ID" + user.getActiveProject() + " does not exist in database");
                } else {
                    Version saveVersion = Version.builder()
                            .version(version.getVersion())
                            .toDo(version.getToDo())
                            .done(version.getDone())
                            .date(version.getDate())
                            .project(optionalProject.get())
                            .build();

                    Version newVersion = versionRepository.save(saveVersion);
//                    List<VersionStation> saveVersionStation = new ArrayList<>();

                    if (!optionalProject.get().getStations().isEmpty()) {
                        for (Station station : optionalProject.get().getStations()) {
                            VersionStation newVersionStation = VersionStation.builder()
                                    .done(false)
                                    .stationName(station.getName())
                                    .version(newVersion)
                                    .build();
//                            saveVersionStation.add(newVersionStation);
                            versionStationRepository.save(newVersionStation);
                            log.info("Version '" + version.getVersion() + "' added to Station '" + station.getName() + "'");
                        }
                    }

                    Project saveProject = optionalProject.get();
                    List<Version> projectVersion = optionalProject.get().getVersions();
                    projectVersion.add(saveVersion);
                    saveProject.setVersions(projectVersion);
                    projectRepository.save(saveProject);

                    log.info("Version '" + version.getVersion() + "' added to Project '" + saveProject.getName() + "'");
                }
            }
        }
    }

    @Transactional
    public void updateVersion(Version version) {
        Optional<Version> optionalVersion = versionRepository.findVersionById(version.getId());
        if(optionalVersion.isEmpty()){
            log.error("Version "+ version.getVersion() + " does not exist in database");
        } else {
            Version saveVersion = optionalVersion.get();
            saveVersion.setVersion(version.getVersion());
            saveVersion.setToDo(version.getToDo());
            saveVersion.setDate(version.getDate());
            saveVersion.setDone(version.getDone());
            if(version.getVersionStation() != null){
                List<VersionStation> versionStationList = version.getVersionStation();
                for(VersionStation versionStation : versionStationList){
                    Optional<VersionStation> optionalVersionStation = versionStationRepository.findById(versionStation.getId());
                    optionalVersionStation.get().setDone(versionStation.getDone());
                }
            }
            log.info("Version '"+ version.getVersion() + "' updated");
        }
    }

    public void deleteVersion(Integer versionId) {
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
