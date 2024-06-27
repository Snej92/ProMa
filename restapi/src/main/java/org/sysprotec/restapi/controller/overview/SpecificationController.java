package org.sysprotec.restapi.controller.overview;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.service.overview.SpecificationService;

import java.util.List;

@RestController
@RequestMapping("/api/specification/station")
@RequiredArgsConstructor
public class SpecificationController {
    private final SpecificationService specificationService;

    @GetMapping("{stationId}")
    public List<Task> getSpecification(@PathVariable Long stationId) {
        return specificationService.getSpecification(stationId);
    }

    @PutMapping
    public Task updateSpecification(@RequestBody Task task) {
        return specificationService.updateSpecification(task);
    }
}
