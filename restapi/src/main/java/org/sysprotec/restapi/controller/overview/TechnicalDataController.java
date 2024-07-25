package org.sysprotec.restapi.controller.overview;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.overview.TechnicalData;
import org.sysprotec.restapi.service.overview.TechnicalDataService;

import java.util.List;

@RestController
@RequestMapping("/api/technicalData/station")
@RequiredArgsConstructor
public class TechnicalDataController {
    private final TechnicalDataService technicalDataService;

    @GetMapping("{stationId}")
    public List<TechnicalData> getDocumentation(@PathVariable Long stationId) {
        return technicalDataService.getTechnicalData(stationId);
    }

    @PutMapping
    public TechnicalData updateDocumentation(@RequestBody TechnicalData technicalData) {
        return technicalDataService.updateTechnicalData(technicalData);
    }
}
