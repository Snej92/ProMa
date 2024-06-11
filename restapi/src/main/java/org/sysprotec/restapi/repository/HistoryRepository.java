package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.History;

@Repository
public interface HistoryRepository extends JpaRepository<History,Integer> {
    History findTopByOrderByIdDesc();
}
