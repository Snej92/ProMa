package org.sysprotec.restapi.controller.settings.taskSetting;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.service.settings.task.SpecificationSettingService;

import java.util.List;

@RestController
@RequestMapping("/api/specification/setting")
@RequiredArgsConstructor
public class SpecificationSettingController {
    private final SpecificationSettingService specificationSettingService;

    @GetMapping
    public List<TaskSetting> getSpecificationSetting() {
        return specificationSettingService.getSpecificationSetting();
    }

    @PostMapping
    public TaskSetting addSpecificationSetting(@RequestBody TaskSetting taskSetting) {
        return specificationSettingService.addSpecificationSetting(taskSetting);
    }

    @PutMapping
    public void updateSpecificationSetting(@RequestBody TaskSetting taskSetting){
        specificationSettingService.updateSpecificationSetting(taskSetting);
    }

    @DeleteMapping("{taskSettingId}")
    public void deleteSpecificationSetting(@PathVariable Long taskSettingId){
        specificationSettingService.deleteSpecificationSetting(taskSettingId);
    }
}
