package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.projections.StationDto;
import org.sysprotec.restapi.model.projections.StationView;

import java.util.List;
import java.util.Optional;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {

    StationView getProjectedById(Long id);
    Optional<List<StationView>> getProjectedByProjectIdOrderById(Long projectId);
    StationDto findTopByOrderByIdDesc();
    StationDto findProjectedById(Long id);
    Station getTopByOrderByIdDesc();

    Optional<Station> findStationByNameAndDocumentationTaskSettingId(String name, Long TaskSettingId);
    Optional<Station> findStationByNameAndSpecificationTaskSettingId(String name, Long TaskSettingId);
    Optional<Station> findStationByNameAndProjectionTaskSettingId(String name, Long TaskSettingId);
    Optional<Station> findStationByNameAndControlTaskSettingId(String name, Long TaskSettingId);
    Optional<Station> findStationByNameAndTechnicalDataTechnicalDataSettingId(String name, Long TechnicalDataSettingId);
    Optional<Station> findStationByNameAndHeaderDataHeaderDataSettingId(String name, Long HeaderDataSettingId);
}
