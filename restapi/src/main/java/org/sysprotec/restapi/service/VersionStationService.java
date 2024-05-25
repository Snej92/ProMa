package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.repository.VersionStationRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class VersionStationService {
    private final VersionStationRepository versionStationRepository;
}
