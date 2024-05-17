package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.projections.StationView;

import java.util.List;

@Repository
public interface StationRepository extends JpaRepository<Station, Integer> {

    StationView getProjectedById(Integer id);
}
