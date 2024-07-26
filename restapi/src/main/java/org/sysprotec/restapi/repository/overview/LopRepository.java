package org.sysprotec.restapi.repository.overview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.overview.Lop;

import java.util.List;
import java.util.Optional;

@Repository
public interface LopRepository extends JpaRepository<Lop, Long> {

    Optional<Lop> findLopById(Long Id);
    Lop findTopByOrderByIdDesc();

}
