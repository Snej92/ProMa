package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.Lop;
import org.sysprotec.restapi.service.LopService;

import java.util.List;

@RestController
@RequestMapping("/api/lop")
@RequiredArgsConstructor
public class LopController {

    private final LopService lopService;

    @GetMapping
    public List<Lop> getLop(){
        return lopService.getLop();
    }

//    @GetMapping("/latest")
//    public List<Lop> getLatestLop(){
//        return lopService.getLatestLop();
//    }

    @PostMapping
    public Lop addLop(@RequestBody Lop lop){
        return lopService.addLop(lop);
    }

    @PutMapping
    public void updateLop(@RequestBody Lop lop){
        lopService.updateLop(lop);
    }

    @DeleteMapping("{lopId}")
    public void deleteLop(@PathVariable Integer lopId){
        lopService.delete(lopId);
    }
}
