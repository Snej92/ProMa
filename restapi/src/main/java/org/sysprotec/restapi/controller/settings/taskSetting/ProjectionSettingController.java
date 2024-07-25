package org.sysprotec.restapi.controller.settings.taskSetting;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.service.settings.task.ProjectionSettingService;

import java.util.List;

@RestController
@RequestMapping("/api/projection/setting")
@RequiredArgsConstructor
public class ProjectionSettingController {
    private final ProjectionSettingService projectionSettingService;

    @GetMapping
    public List<TaskSetting> getProjectionSetting() {
        return projectionSettingService.getProjectionSetting();
    }

    @PostMapping
    public TaskSetting addProjectionSetting(@RequestBody TaskSetting taskSetting) {
        return projectionSettingService.addProjectionSetting(taskSetting);
    }

    @PutMapping
    public void updateProjectionSetting(@RequestBody TaskSetting taskSetting){
        projectionSettingService.updateProjectionSetting(taskSetting);
    }

    @DeleteMapping("{taskSettingId}")
    public void deleteProjectionSetting(@PathVariable Long taskSettingId){
        projectionSettingService.deleteProjectionSetting(taskSettingId);
    }
}
