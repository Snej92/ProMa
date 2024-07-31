package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.projections.StationDto;
import org.sysprotec.restapi.model.projections.StationView;
import org.sysprotec.restapi.service.StationService;

import java.util.List;

@RestController
@RequestMapping("/api/station")
@RequiredArgsConstructor
public class StationController {

    private final StationService stationService;

    //todo: add ResponseEntity
    @GetMapping("/all")
    public List<StationView> getAllStations(){
        return stationService.getAllStations();
    }

    @GetMapping("{stationId}")
    public StationView getStation(@PathVariable Long stationId){
        return stationService.getStation(stationId);
    }

    @PostMapping
    public StationDto addStation(@RequestBody StationDto stationDto){
        return stationService.addStation(stationDto);
    }

    @PutMapping
    public StationDto updateStation(@RequestBody StationDto stationDto){
        return stationService.updateStation(stationDto);
    }

    @DeleteMapping("{stationId}")
    public void deleteStation(@PathVariable Long stationId){
        stationService.deleteStation(stationId);
    }

    @PostMapping("/updateStationStatus")
    public void updateAllStationStatus(){
        stationService.updateAllStationStatus();
    }
}
