package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    //todo: add ResponseEntity
    @GetMapping("/all")
    public List<Project> getAllProjects(){
        return projectService.getAllProjects();
    }

    @GetMapping
    public Project getProject(@RequestParam Integer projectId){
        return projectService.getProject(projectId);
    }

    @PostMapping
    public void addProject(@RequestBody Project project){
        projectService.addProject(project);
    }

    @PutMapping
    public void updateProject(@RequestBody Project project){
        projectService.updateProject(project);
    }

    @DeleteMapping
    public void deleteProject(@RequestBody Project project){
        projectService.deleteProject(project);
    }
}