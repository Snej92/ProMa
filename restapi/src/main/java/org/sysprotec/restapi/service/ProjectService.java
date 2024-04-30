package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    public static Integer PROJECT_ID = 1;
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
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
