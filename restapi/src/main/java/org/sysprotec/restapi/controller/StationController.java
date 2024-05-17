package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
