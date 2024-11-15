package org.sysprotec.restapi.repository.overview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.overview.TechnicalData;

import java.util.List;

@Repository
public interface TechnicalDataRepository extends JpaRepository<TechnicalData, Long> {
    List<TechnicalData> findAllByTechnicalDataSettingIdOrderByIdAsc(Long technicalDataSettingId);
    List<TechnicalData> findAllByStationIdOrderByIdAsc(Long stationId);
    List<TechnicalData> findAllByOrderByIdDesc();
    TechnicalData findTopByOrderByIdDesc();
}
