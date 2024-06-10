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
    public List<LopSetting> getSettingLop(){
        return lopSettingService.getSettingLop();
    }

    @PostMapping()
    public LopSetting addSettingLop(@RequestBody LopSetting lopSetting){
        return lopSettingService.addSettingLop(lopSetting);
    }

    @PutMapping
    public void updateSettingLop(@RequestBody LopSetting lopSetting){
        lopSettingService.updateSettingLop(lopSetting);
    }

    @DeleteMapping("{lopId}")
    public void deleteSettingLop(@PathVariable Integer lopId){
        lopSettingService.delete(lopId);
    }
}
