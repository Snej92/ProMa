package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.projections.ProjectDto;
import org.sysprotec.restapi.model.projections.ProjectView;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public List<ProjectView> getAllProjects() {
        return projectRepository.findBy();
    }

    public ProjectDto getActiveProject() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if(user!=null){
                if(user.getActiveProject()!=null){
                    if(user.getActiveProject()!=0){
                        log.info("send active project to frontend");
                        return projectRepository.getProjectedById(user.getActiveProject());
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
        Project saveProject = Project.builder()
                .name(projectDto.getName())
                .description(projectDto.getDescription())
                .favorite(projectDto.getFavorite())
                .amountStations(projectDto.getAmountStations())
                .inProgressStations(projectDto.getInProgressStations())
                .storedStations(projectDto.getStoredStations())
                .notStoredStations(projectDto.getNotStoredStations())
                .build();
        projectRepository.save(saveProject);
        log.info("Project " + projectDto.getName() + " created");
        return projectRepository.findTopByOrderByIdDesc();
    }

    public ProjectDto updateProject(ProjectDto projectDto) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectDto.getId());
        if(optionalProject.isPresent()){
            Project saveProject = optionalProject.get();
            saveProject.setName(projectDto.getName());
            saveProject.setDescription(projectDto.getDescription());
            saveProject.setFavorite(projectDto.getFavorite());
            saveProject.setAmountStations(projectDto.getAmountStations());
            saveProject.setInProgressStations(projectDto.getInProgressStations());
            saveProject.setStoredStations(projectDto.getStoredStations());
            saveProject.setNotStoredStations(projectDto.getNotStoredStations());

            projectRepository.save(saveProject);
            return projectRepository.getProjectedById(projectDto.getId());
        }else {
            log.error("Project with ID{} does not exist", projectDto.getId());
            return null;
        }
    }

    public void deleteProject(Integer projectId) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectId);
        if(optionalProject.isPresent()){
            projectRepository.delete(optionalProject.get());
        }else log.error("Project with ID " + projectId +" does not exist");
    }
}
