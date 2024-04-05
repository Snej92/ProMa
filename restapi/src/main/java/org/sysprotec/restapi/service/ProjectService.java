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

    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public void addProject(Project project) {
        projectRepository.save(project);
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
