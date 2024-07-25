package org.sysprotec.restapi.controller.overview.task;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.service.overview.task.DocumentationService;

import java.util.List;

@RestController
@RequestMapping("/api/documentation/station")
@RequiredArgsConstructor
public class DocumentationController {
    private final DocumentationService documentationService;

    @GetMapping("{stationId}")
    public List<Task> getDocumentation(@PathVariable Long stationId) {
        return documentationService.getDocumentation(stationId);
    }

    @PutMapping
    public Task updateDocumentation(@RequestBody Task task) {
        return documentationService.updateDocumentation(task);
    }
}
