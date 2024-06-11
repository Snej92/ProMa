package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.projections.StationDto;
import org.sysprotec.restapi.model.projections.StationView;

import java.util.List;
import java.util.Optional;

@Repository
public interface StationRepository extends JpaRepository<Station, Integer> {

    StationView getProjectedById(Integer id);
    Optional<List<StationView>> getProjectedByProjectId(Integer projectId);
    StationDto findTopByOrderByIdDesc();
    StationDto findProjectedById(Integer id);
    Station getTopByOrderByIdDesc();
    Optional<Station> findStationByNameAndLopLopSettingId(String name, Integer LopSettingId);
}
