package org.sysprotec.restapi.controller.settings;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.overview.TechnicalData;
import org.sysprotec.restapi.model.settings.TechnicalDataSetting;
import org.sysprotec.restapi.service.settings.TechnicalDataSettingService;

import java.util.List;


@RestController
@RequestMapping("/api/technicalData/setting")
@RequiredArgsConstructor
public class TechnicalDataSettingController {
    private final TechnicalDataSettingService technicalDataSettingService;

    @GetMapping
    public List<TechnicalDataSetting> getTechnicalDataSetting() {
        return technicalDataSettingService.getTechnicalDataSetting();
    }

    @PostMapping
    public TechnicalDataSetting addTechnicalDataSetting(@RequestBody TechnicalDataSetting technicalDataSetting) {
        return technicalDataSettingService.addTechnicalDataSetting(technicalDataSetting);
    }

    @PutMapping
    public void updateTechnicalDataSetting(@RequestBody TechnicalDataSetting technicalDataSetting){
        technicalDataSettingService.updateTechnicalDataSetting(technicalDataSetting);
    }

    @DeleteMapping("{technicalDataSettingId}")
    public void deleteTechnicalDataSetting(@PathVariable Long technicalDataSettingId){
        technicalDataSettingService.deleteTechnicalDataSetting(technicalDataSettingId);
    }
}
