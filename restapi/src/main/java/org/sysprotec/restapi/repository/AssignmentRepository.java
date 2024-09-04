package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.sysprotec.restapi.model.Assignment;

import java.util.List;
import java.util.Optional;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Optional<List<Assignment>> findAssignmentsByUserIdAndDateContaining(Long userId, String date);
    Optional<List<Assignment>> findAssignmentsByDateContaining(String date);
    Optional<List<Assignment>> findAssignmentsByProjectId(Long id);
    Optional<List<Assignment>> findAssignmentsByUserId(Long id);
}
