package org.sysprotec.restapi.repository.overview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.overview.Lop;

import java.util.Optional;

@Repository
public interface LopRepository extends JpaRepository<Lop, Integer> {

    Optional<Lop> findLopById(Integer Id);
    Lop findTopByOrderByIdDesc();
}