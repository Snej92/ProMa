package org.sysprotec.restapi.repository.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.settings.Version;

import java.util.List;
import java.util.Optional;

@Repository
public interface VersionRepository extends JpaRepository<Version, Long> {
    Optional<Version> findVersionById(Long id);
    Version findTopByOrderByIdDesc();
    List<Version> findVersionsByProjectIdOrderByVersionAsc(Long projectId);
}
