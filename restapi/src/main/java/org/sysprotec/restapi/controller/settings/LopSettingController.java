package org.sysprotec.restapi.controller.settings;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.settings.LopSetting;
import org.sysprotec.restapi.service.settings.LopSettingService;

import java.util.List;

@RestController
@RequestMapping("/api/lop/setting")
@RequiredArgsConstructor
public class LopSettingController {

    private final LopSettingService lopSettingService;


    @GetMapping()
    public List<LopSetting> getLopSetting(){
        return lopSettingService.getLopSetting();
    }

    @PostMapping()
    public LopSetting addLopSetting(@RequestBody LopSetting lopSetting){
        return lopSettingService.addLopSetting(lopSetting);
    }

    @PutMapping
    public void updateLopSetting(@RequestBody LopSetting lopSetting){
        lopSettingService.updateLopSetting(lopSetting);
    }

    @DeleteMapping("{lopId}")
    public void deleteLopSetting(@PathVariable Long lopId){
        lopSettingService.deleteLopSetting(lopId);
    }
}
