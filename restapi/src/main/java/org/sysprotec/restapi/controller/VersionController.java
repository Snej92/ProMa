package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.Version;
import org.sysprotec.restapi.service.VersionService;

import java.util.List;

@RestController
@RequestMapping("/api/version")
@RequiredArgsConstructor
public class VersionController {

    private final VersionService versionService;

    @GetMapping
    public List<Version> getVersions(
            @RequestParam Integer projectId){
        return versionService.getVersions(projectId);
    }

    @PostMapping
    public void addVersion(
            @RequestBody Version version,
            @RequestParam Integer projectId){
        versionService.addVersion(version, projectId);
    }

    @PutMapping
    public void updateVersion(@RequestBody Version version){
        versionService.updateVersion(version);
    }

    @DeleteMapping
    public void deleteVersion(@RequestBody Version version){
        versionService.deleteVersion(version);
    }
}
