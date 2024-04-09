package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.Version;
import org.sysprotec.restapi.model.VersionStation;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.VersionRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class VersionService {

    private final VersionRepository versionRepository;
    private final ProjectRepository projectRepository;

    public List<Version> getVersions(Integer projectId) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectId);
        if(optionalProject.isEmpty()){
            log.error("Project with id "+ projectId + " does not exist in database");
        } else {
            return optionalProject.get().getVersions();
        }
        return null;
    }

    public void addVersion(Version version, Integer projectId) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectId);
        if(optionalProject.isEmpty()){
            log.error("Project with id "+ projectId + " does not exist in database");
        } else {
            List<VersionStation> saveVersionStation = new ArrayList<>();

            if(!optionalProject.get().getStations().isEmpty()){
                for(Station station : optionalProject.get().getStations()){
                    VersionStation newVersionStation = VersionStation.builder()
                            .done(false)
                            .stationName(station.getName())
                            .build();
                    saveVersionStation.add(newVersionStation);
                }
            }

            Version saveVersion = Version.builder()
                    .version(version.getVersion())
                    .toDo(version.getToDo())
                    .done(version.getDone())
                    .date(version.getDate())
                    .versionStation(saveVersionStation)
                    .build();

            Project saveProject = optionalProject.get();
            List<Version> projectVersion = optionalProject.get().getVersions();
            projectVersion.add(saveVersion);
            saveProject.setVersions(projectVersion);
            projectRepository.save(saveProject);
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
        }
    }

    public void deleteVersion(Version version) {
        Optional<Project> optionalProject = projectRepository.findProjectByVersionsId(version.getId());
        Optional<Version> optionalVersion = versionRepository.findVersionById(version.getId());
        if(optionalVersion.isEmpty() || optionalProject.isEmpty()){
            log.error("Version "+ version.getVersion() + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            saveProject.removeVersion(version.getId());
            versionRepository.deleteById(version.getId());
        }
    }
}
