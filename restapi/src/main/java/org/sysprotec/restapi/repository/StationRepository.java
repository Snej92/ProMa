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

    StationDto findTopByOrderByIdDesc();
    StationDto findProjectedById(Long id);
    Station getStationByDocumentationId(Long id);
    Station getStationByControlId(Long id);
    Station getStationBySpecificationId(Long id);
    Station getStationByProjectionId(Long id);
    Station getStationByLopId(Long id);

    Optional<Station> findStationByNameIgnoreCase(String name);
    Optional<Station> findStationByNameIgnoreCaseAndProjectId(String name, Long id);

    Optional<Station> findStationByNameAndDocumentationTaskSettingId(String name, Long TaskSettingId);
    Optional<Station> findStationByNameAndSpecificationTaskSettingId(String name, Long TaskSettingId);
    Optional<Station> findStationByNameAndProjectionTaskSettingId(String name, Long TaskSettingId);
    Optional<Station> findStationByNameAndControlTaskSettingId(String name, Long TaskSettingId);
    Optional<Station> findStationByNameAndTechnicalDataTechnicalDataSettingId(String name, Long TechnicalDataSettingId);
    Optional<Station> findStationByNameAndHeaderDataHeaderDataSettingId(String name, Long HeaderDataSettingId);

    List<Station> getStationsByProjectId(Long id);
    List<Station> findByProjectIdOrderByNameAsc(Long projectId);

    Optional<List<StationView>> getProjectedByProjectIdOrderByNameAsc(Long projectId);
    Optional<List<Station>> getByProjectIdOrderByNameAsc(Long projectId);
}
