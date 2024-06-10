package org.sysprotec.restapi.controller.overview;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.service.overview.LopService;

import java.util.List;

@RestController
@RequestMapping("/api/lop/station")
@RequiredArgsConstructor
public class LopController {

    private final LopService lopService;

    @GetMapping("{stationId}")
    public List<Lop> getStationLop(@PathVariable Integer stationId){
        return lopService.getStationLop(stationId);
    }

    @PutMapping
    public void updateLop(@RequestBody Lop lop){
        lopService.updateLop(lop);
    }
}
