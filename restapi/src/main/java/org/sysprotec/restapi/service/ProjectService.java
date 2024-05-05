package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.projections.ProjectView;
import org.sysprotec.restapi.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    public static Integer PROJECT_ID = 1;
    private final ProjectRepository projectRepository;

    public List<ProjectView> getAllProjects() {
        return projectRepository.findBy();
    }

    public Project getProject(Integer projectId) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectId);
        if(optionalProject.isPresent()){
//            PROJECT_ID = optionalProject.get().getId();
            return optionalProject.get();
        }else log.error("Project with ID" + projectId +" does not exist in database");
        return null;
    }

    public void addProject(Project project) {
        Project saveProject = Project.builder()
                .name(project.getName())
                .description(project.getDescription())
                .favorite(project.getFavorite())
                .amountStations(project.getAmountStations())
                .inProgressStations(project.getInProgressStations())
                .storedStations(project.getStoredStations())
                .notStoredStations(project.getNotStoredStations())
                .build();
        projectRepository.save(saveProject);
    }

    public void updateProject(Project project) {
        Optional<Project> optionalProject = projectRepository.findProjectById(project.getId());
        if(optionalProject.isPresent()){
            Project saveProject = optionalProject.get();
            saveProject.setName(project.getName());
            saveProject.setDescription(project.getDescription());
            saveProject.setFavorite(project.getFavorite());
            saveProject.setAmountStations(project.getAmountStations());
            saveProject.setInProgressStations(project.getInProgressStations());
            saveProject.setStoredStations(project.getStoredStations());
            saveProject.setNotStoredStations(project.getNotStoredStations());

            projectRepository.save(saveProject);
        }else log.error("Project " + project.getName() +" does not exist");
    }

    public void deleteProject(Project project) {
        Optional<Project> optionalProject = projectRepository.findProjectById(project.getId());
        if(optionalProject.isPresent()){
            projectRepository.delete(project);
        }else log.error("Project " + project.getName() +" does not exist");
    }
}
