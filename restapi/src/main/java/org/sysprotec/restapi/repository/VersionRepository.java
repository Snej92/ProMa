package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.Version;

import java.util.Optional;

@Repository
public interface VersionRepository extends JpaRepository<Version, Integer> {
    Optional<Version> findVersionById(Integer id);
    Version findTopByOrderByIdDesc();
}
