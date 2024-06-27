package org.sysprotec.restapi.controller.settings;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.service.settings.ControlSettingService;

import java.util.List;

@RestController
@RequestMapping("/api/control/setting")
@RequiredArgsConstructor
public class ControlSettingController {
    private final ControlSettingService controlSettingService;

    @GetMapping
    public List<TaskSetting> getControlSetting() {
        return controlSettingService.getControlSetting();
    }

    @PostMapping
    public TaskSetting addControlSetting(@RequestBody TaskSetting taskSetting) {
        return controlSettingService.addControlSetting(taskSetting);
    }

    @PutMapping
    public void updateControlSetting(@RequestBody TaskSetting taskSetting){
        controlSettingService.updateControlSetting(taskSetting);
    }

    @DeleteMapping("{taskSettingId}")
    public void deleteControlSetting(@PathVariable Long taskSettingId){
        controlSettingService.deleteControlSetting(taskSettingId);
    }
}
