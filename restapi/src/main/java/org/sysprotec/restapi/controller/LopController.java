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

//    @GetMapping
//    public List<Lop> getLop(@RequestParam Integer projectId){
//        return lopService.getLop(projectId);
//    }

    @GetMapping
    public List<Lop> getLop(){
        return lopService.getLop();
    }

    @PostMapping
    public void addLop(
            @RequestBody Lop lop,
            @RequestParam Integer projectId){
        lopService.addLop(lop, projectId);
    }

    @PutMapping
    public void updateLop(@RequestBody Lop lop){
        lopService.updateLop(lop);
    }

    @DeleteMapping
    public void deleteLop(@RequestParam Integer lopId){
        lopService.delete(lopId);
    }
}
