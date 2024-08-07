package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.projections.ProjectDto;
import org.sysprotec.restapi.model.settings.Version;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.settings.VersionRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final VersionRepository versionRepository;
    private final UserService userService;

    public List<Project> getAllProjects(Boolean archive) {
        return projectRepository.findProjectsByArchived(archive);
    }

    public ProjectDto getActiveProject() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            userService.SyncUser();
            if(user!=null){
                if(user.getActiveProject()!=null){
                    if(user.getActiveProject()!=0){
                        if(projectRepository.getProjectedById(user.getActiveProject()) != null){
                            log.info("send active project to frontend");
                            return projectRepository.getProjectedById(user.getActiveProject());
                        } else {
                            log.info("active project not found, active project set to 0");
                            user.setActiveProject(0L);
                            userRepository.save(user);
                        }
                    }
                }
                log.info("send dummy project to frontend");
                return ProjectDto.builder()
                        .name("Kein Projekt ausgewählt")
                        .build();
            }
            log.info("send dummy project to frontend");
            return ProjectDto.builder()
                    .name("Kein Projekt ausgewählt")
                    .build();
        }
        return null;
    }

    public ProjectDto addProject(ProjectDto projectDto) {
        if(projectRepository.findProjectByNameIgnoreCase(projectDto.getName()) == null){
            Project saveProject = Project.builder()
                    .archived(projectDto.getArchived())
                    .name(projectDto.getName())
                    .description(projectDto.getDescription())
                    .amountStations(projectDto.getAmountStations())
                    .inProgressStations(projectDto.getInProgressStations())
                    .storedStations(projectDto.getStoredStations())
                    .notStoredStations(projectDto.getNotStoredStations())
                    .build();
            projectRepository.save(saveProject);

            //Add start Version to Project
            Version startVersion = Version.builder()
                    .version("V1.0")
                    .toDo("Projekt angelegt")
                    .done(true)
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")))
                    .project(projectRepository.findTopByOrderByIdDesc())
                    .build();
            versionRepository.save(startVersion);
            log.info("Project " + projectDto.getName() + " created");
            return projectRepository.findProjectedTopByOrderByIdDesc();
        }
        return null;
    }

    public ProjectDto updateProject(ProjectDto projectDto) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectDto.getId());
        if(optionalProject.isPresent()){
            Project saveProject = optionalProject.get();
            saveProject.setArchived(projectDto.getArchived());
            saveProject.setName(projectDto.getName());
            saveProject.setDescription(projectDto.getDescription());
            saveProject.setAmountStations(projectDto.getAmountStations());
            saveProject.setInProgressStations(projectDto.getInProgressStations());
            saveProject.setStoredStations(projectDto.getStoredStations());
            saveProject.setNotStoredStations(projectDto.getNotStoredStations());

            if(saveProject.getArchived()){
                List<User> userList = userRepository.findUserByActiveProject(saveProject.getId());
                for(User user : userList){
                    user.setActiveProject(0L);
                }
            }

            projectRepository.save(saveProject);
            return projectRepository.getProjectedById(projectDto.getId());
        }else {
            log.error("Project with ID{} does not exist", projectDto.getId());
            return null;
        }
    }

    public void deleteProject(Long projectId) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectId);
        if(optionalProject.isPresent()){
            List<User> userList = userRepository.findUserByActiveProject(projectId);
            for(User user : userList){
                user.setActiveProject(0L);
            }
            projectRepository.delete(optionalProject.get());
        }else log.error("Project with ID " + projectId +" does not exist");
    }

//    ########################## addition ##############################

    public void updateStationAmount(Project project){
        List<Station> station = project.getStations();
        if(station != null){
            int amountStations = 0;
            int inProgressStations = 0;
            int storedStations = 0;
            int notStoredStations = 0;
            if(!station.isEmpty()){
                //amount stations
                amountStations = station.size();

                for(Station stations : station){
                    if(stations.getStatus() == StatusEPLAN.INARBEIT){
                        inProgressStations += 1;
                    } else if(stations.getStatus() == StatusEPLAN.AUSGELAGERT){
                        notStoredStations += 1;
                    } else if (stations.getStatus() == StatusEPLAN.EINGELAGERT){
                        storedStations += 1;
                    }
                }
            }
            project.setAmountStations(amountStations);
            project.setInProgressStations(inProgressStations);
            project.setStoredStations(storedStations);
            project.setNotStoredStations(notStoredStations);

            projectRepository.save(project);
        }
    }
}
