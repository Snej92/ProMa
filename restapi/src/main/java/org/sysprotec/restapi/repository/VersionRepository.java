package org.sysprotec.restapi.repository;

import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.sysprotec.restapi.model.Version;

import java.util.Optional;

@Registered
public interface VersionRepository extends JpaRepository<Version, Integer> {
    Optional<Version> findVersionById(Integer id);
}
