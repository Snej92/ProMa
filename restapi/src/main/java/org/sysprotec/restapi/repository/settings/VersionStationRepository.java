package org.sysprotec.restapi.repository.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.settings.VersionStation;

import java.util.List;


@Repository
public interface VersionStationRepository extends JpaRepository<VersionStation, Long> {
    List<VersionStation> findVersionStationsByVersionIdOrderByIdAsc(Long versionId);
    List<VersionStation> findVersionStationsByStationNameOrderByIdAsc(String stationName);
    List<VersionStation> findVersionStationsByVersionIdOrderByStationNameAsc(Long versionId);
}
