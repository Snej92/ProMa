package org.sysprotec.restapi.controller.overview;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.overview.HeaderData;
import org.sysprotec.restapi.service.overview.HeaderDataService;

import java.util.List;

@RestController
@RequestMapping("/api/headerData/station")
@RequiredArgsConstructor
public class HeaderDataController {
    private final HeaderDataService headerDataService;

    @GetMapping("{stationId}")
    public List<HeaderData> getDocumentation(@PathVariable Long stationId) {
        return headerDataService.getHeaderData(stationId);
    }

    @PutMapping
    public HeaderData updateDocumentation(@RequestBody HeaderData headerData) {
        return headerDataService.updateHeaderData(headerData);
    }
}
