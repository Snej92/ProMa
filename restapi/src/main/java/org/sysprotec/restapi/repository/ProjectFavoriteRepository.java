package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.sysprotec.restapi.model.project.ProjectFavorite;

import java.util.Optional;

public interface ProjectFavoriteRepository extends JpaRepository<ProjectFavorite, Long> {
    Optional<ProjectFavorite> findByUserIdAndProjectId(Long userId, Long projectId);
}
