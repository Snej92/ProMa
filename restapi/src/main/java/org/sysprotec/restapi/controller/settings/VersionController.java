package org.sysprotec.restapi.controller.settings;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.settings.Version;
import org.sysprotec.restapi.service.VersionService;

import java.util.List;


@RestController
@RequestMapping("/api/version")
@RequiredArgsConstructor
public class VersionController {

    private final VersionService versionService;

    @GetMapping
    public List<Version> getVersions(){
        return versionService.getVersions();
    }

    @PostMapping
    public Version addVersion(@RequestBody Version version){
        return versionService.addVersion(version);
    }

    @PutMapping
    public Version updateVersion(@RequestBody Version version){
        return versionService.updateVersion(version);
    }

    @DeleteMapping("{versionId}")
    public void deleteVersion(@PathVariable Long versionId){
        versionService.deleteVersion(versionId);
    }
}
