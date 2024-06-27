package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findUserByUsernameIgnoreCase(String username);
    User findUserBySub(String sub);
    Optional<User> getUserBySub(String sub);
    User findTopByOrderByIdDesc();
}
