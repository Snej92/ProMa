package org.sysprotec.restapi.controller.settings.taskSetting;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.service.settings.task.DocumentationSettingService;

import java.util.List;

@RestController
@RequestMapping("/api/documentation/setting")
@RequiredArgsConstructor
public class DocumentationSettingController {
    private final DocumentationSettingService documentationSettingService;

    @GetMapping
    public List<TaskSetting> getDocumentationSetting() {
        return documentationSettingService.getDocumentationSetting();
    }

    @PostMapping
    public TaskSetting addDocumentationSetting(@RequestBody TaskSetting taskSetting) {
        return documentationSettingService.addDocumentationSetting(taskSetting);
    }

    @PutMapping
    public void updateDocumentationSetting(@RequestBody TaskSetting taskSetting){
        documentationSettingService.updateDocumentationSetting(taskSetting);
    }

    @DeleteMapping("{taskSettingId}")
    public void deleteDocumentationSetting(@PathVariable Long taskSettingId){
        documentationSettingService.deleteDocumentationSetting(taskSettingId);
    }
}
