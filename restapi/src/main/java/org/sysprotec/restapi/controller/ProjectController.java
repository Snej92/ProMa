package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.project.ProjectGet;
import org.sysprotec.restapi.model.projections.ProjectFavView;
import org.sysprotec.restapi.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;


    @PostMapping("/all")
    public List<ProjectFavView> getAllProjects(
            @RequestBody ProjectGet projectGet){
        return projectService.getAllProjects(projectGet.getArchived(), projectGet.getAll());
    }

    @GetMapping
    public ProjectFavView getActiveProject(){
        return projectService.getActiveProject();
    }

    @PostMapping("{template}")
    public ProjectFavView addProject(
            @RequestBody ProjectFavView projectFavView,
            @PathVariable String template){
        return projectService.addProject(projectFavView, template);
    }

    @PutMapping
    public ProjectFavView updateProject(@RequestBody ProjectFavView projectFavView){
        return projectService.updateProject(projectFavView);
    }

    @DeleteMapping("{projectId}")
    public void deleteProject(@PathVariable Long projectId){
        projectService.deleteProject(projectId);
    }

    @GetMapping("favorite/{projectId}/{remove}")
    public void editFavorite(@PathVariable Long projectId,
                             @PathVariable Boolean remove){
        projectService.editFavorite(projectId, remove);
    }

    @GetMapping("/favorite")
    public List<ProjectFavView> getFavorites(){
        return projectService.getFavorites();
    }
}
