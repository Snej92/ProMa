package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.projections.ProjectDto;
import org.sysprotec.restapi.model.projections.ProjectView;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    Optional<Project> findProjectById(Integer id);
    Optional<Project> findProjectByVersionsId(Integer id);
    Optional<Project> findProjectByLopId(Integer id);
    List<ProjectView> findBy();
    ProjectDto getProjectedById(Integer id);
}
