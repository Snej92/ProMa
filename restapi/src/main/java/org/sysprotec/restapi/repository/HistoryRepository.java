package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.History;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History,Integer> {
    History findTopByOrderByIdDesc();
    List<History> findHistoriesByStationIdOrderByIdDesc(Integer stationId);
}
