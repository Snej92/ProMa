package org.sysprotec.restapi.controller.overview;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.service.overview.ControlService;

import java.util.List;

@RestController
@RequestMapping("/api/control/station")
@RequiredArgsConstructor
public class ControlController {
    private final ControlService controlService;

    @GetMapping("{stationId}")
    public List<Task> getControl(@PathVariable Long stationId) {
        return controlService.getControl(stationId);
    }

    @PutMapping
    public Task updateControl(@RequestBody Task task) {
        return controlService.updateControl(task);
    }
}
