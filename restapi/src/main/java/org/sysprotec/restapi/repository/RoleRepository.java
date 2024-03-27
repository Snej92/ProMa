package org.sysprotec.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
