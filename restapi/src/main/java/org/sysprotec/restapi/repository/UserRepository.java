package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> getUserBySub(String sub);
    Optional<User> findUserByAcronym(String acronym);
    Optional<User> findUserByUsernameIgnoreCaseOrAcronym(String username, String acronym);

    User findUserByUsernameIgnoreCase(String username);
    User findUserBySub(String sub);
    User findTopByOrderByIdDesc();

    List<User> findUserByActiveProject(Long activeProject);
    List<User> findAllByOrderByIdAsc();

}
