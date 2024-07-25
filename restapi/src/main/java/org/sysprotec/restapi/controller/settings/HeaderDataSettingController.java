package org.sysprotec.restapi.controller.settings;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.settings.HeaderDataSetting;
import org.sysprotec.restapi.service.settings.HeaderDataSettingService;

import java.util.List;

@RestController
@RequestMapping("/api/headerData/setting")
@RequiredArgsConstructor
public class HeaderDataSettingController {
    private final HeaderDataSettingService headerDataSettingService;

    @GetMapping
    public List<HeaderDataSetting> getHeaderDataSetting() {
        return headerDataSettingService.getHeaderDataSetting();
    }

    @PostMapping
    public HeaderDataSetting addHeaderDataSetting(@RequestBody HeaderDataSetting headerDataSetting) {
        return headerDataSettingService.addHeaderDataSetting(headerDataSetting);
    }

    @PutMapping
    public void updateHeaderDataSetting(@RequestBody HeaderDataSetting headerDataSetting){
        headerDataSettingService.updateHeaderDataSetting(headerDataSetting);
    }

    @DeleteMapping("{headerDataSettingId}")
    public void deleteHeaderDataSetting(@PathVariable Long headerDataSettingId){
        headerDataSettingService.deleteHeaderDataSetting(headerDataSettingId);
    }
}
