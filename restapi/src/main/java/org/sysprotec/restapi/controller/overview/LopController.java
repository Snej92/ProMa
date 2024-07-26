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
    public List<Lop> getStationLop(@PathVariable Long stationId){
        return lopService.getStationLop(stationId);
    }

    @PostMapping("{stationId}")
    public Lop addLop(@RequestBody Lop lop,
                      @PathVariable Long stationId){
        return lopService.addLop(stationId, lop);
    }

    @DeleteMapping("{lopId}")
    public void deleteLop(@PathVariable Long lopId){
        lopService.deleteLop(lopId);
    }

    @PutMapping
    public Lop updateLop(@RequestBody Lop lop){
        return lopService.updateLop(lop);
    }
}
