package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.projections.ProjectDto;
import org.sysprotec.restapi.model.projections.ProjectView;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findProjectById(Long id);
    List<Project> findProjectsByArchived(Boolean archived);
    List<ProjectView> findBy();
    ProjectDto getProjectedById(Long id);
    Project findTopByOrderByIdDesc();
    ProjectDto findProjectedTopByOrderByIdDesc();
    Project findProjectByStationsId(Long id);

    Project findProjectByNameIgnoreCase(String name);

    //find By other ID
    Optional<Project> findProjectByVersionsId(Long id);
    Optional<Project> findProjectByDocumentationSettingId(Long id);
    Optional<Project> findProjectByControlSettingId(Long id);
    Optional<Project> findProjectByHeaderDataSettingId(Long id);
    Optional<Project> findProjectBySpecificationSettingId(Long id);
    Optional<Project> findProjectByProjectionSettingId(Long id);
    Optional<Project> findProjectByTechnicalDataSettingId(Long id);
}
