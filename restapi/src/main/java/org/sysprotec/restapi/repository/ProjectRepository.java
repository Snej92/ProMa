package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.Project;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    Optional<Project> findProjectById(Integer id);
}
