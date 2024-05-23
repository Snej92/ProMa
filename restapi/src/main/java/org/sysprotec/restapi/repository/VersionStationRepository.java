package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.VersionStation;

import java.util.List;


@Repository
public interface VersionStationRepository extends JpaRepository<VersionStation, Integer> {
    List<VersionStation> findVersionStationsByVersionIdOrderByIdAsc(Integer versionStationId);
}
