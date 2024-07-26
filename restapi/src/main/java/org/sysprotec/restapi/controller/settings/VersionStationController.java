package org.sysprotec.restapi.controller.settings;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.sysprotec.restapi.service.VersionStationService;

@RestController
@RequestMapping("/api/versionStation")
@RequiredArgsConstructor
public class VersionStationController {
    private final VersionStationService versionStationService;


}
