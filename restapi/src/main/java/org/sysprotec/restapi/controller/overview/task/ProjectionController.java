package org.sysprotec.restapi.controller.overview.task;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.service.overview.task.ProjectionService;

import java.util.List;

@RestController
@RequestMapping("/api/projection/station")
@RequiredArgsConstructor
public class ProjectionController {
    private final ProjectionService projectionService;

    @GetMapping("{stationId}")
    public List<Task> getProjection(@PathVariable Long stationId) {
        return projectionService.getProjection(stationId);
    }

    @PutMapping
    public Task updateProjection(@RequestBody Task task) {
        return projectionService.updateProjection(task);
    }
}
