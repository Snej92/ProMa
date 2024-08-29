package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.sysprotec.restapi.model.StationFavorite;

import java.util.Optional;

public interface StationFavoriteRepository extends JpaRepository<StationFavorite, Long> {
    Optional<StationFavorite> findByUserIdAndStationId(Long userId, Long stationId);
}
