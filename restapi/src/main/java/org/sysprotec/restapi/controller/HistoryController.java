package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.History;
import org.sysprotec.restapi.service.HistoryService;

import java.util.List;

@RestController
@RequestMapping("/api/history/station")
@RequiredArgsConstructor
public class HistoryController {

    public final HistoryService historyService;

    @GetMapping("{stationId}")
    public List<History> getStationHistory(@PathVariable Integer stationId){
        return historyService.getHistoryByStationId(stationId);
    }

    @PostMapping("{stationId}")
    public History addStationHistory(@RequestBody History history,
                                     @PathVariable Integer stationId){
        return historyService.addHistory(history, stationId);
    }
}