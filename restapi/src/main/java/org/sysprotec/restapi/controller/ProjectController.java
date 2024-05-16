package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.projections.ProjectDto;
import org.sysprotec.restapi.model.projections.ProjectView;
import org.sysprotec.restapi.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    //todo: add ResponseEntity
    @GetMapping("/all")
    public List<ProjectView> getAllProjects(){
        return projectService.getAllProjects();
    }

    @GetMapping
    public ProjectDto getActiveProject(){
        return projectService.getActiveProject();
    }

    @PostMapping
    public ProjectDto addProject(@RequestBody ProjectDto projectDto){
        return projectService.addProject(projectDto);
    }

    @PutMapping
    public ProjectDto updateProject(@RequestBody ProjectDto projectDto){
        return projectService.updateProject(projectDto);
    }

    @DeleteMapping("{projectId}")
    public void deleteProject(@PathVariable Integer projectId){
        projectService.deleteProject(projectId);
    }
}
