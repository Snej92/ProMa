package org.sysprotec.restapi.service;

import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.Role;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.repository.RoleRepository;
import org.sysprotec.restapi.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class KeycloakService {

    private final String REALM_NAME = "ProMa";

    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private Keycloak keycloak;

    public KeycloakService(RoleRepository roleRepository, UserRepository userRepository, Keycloak keycloak) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.keycloak = keycloak;
    }


    public ResponseEntity<String> createUser(User user){

        List<String> groups = new ArrayList<>();
        if(user.getRoles().getAdminRole()){
            groups.add("Admin");
        }
        if(user.getRoles().getProjectRole()){
            groups.add("Project");
        }
        if(user.getRoles().getUserRole()){
            groups.add("User");
        }

        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEnabled(true);
        userRepresentation.setUsername(user.getUsername());
        userRepresentation.setFirstName(user.getFirstname());
        userRepresentation.setLastName(user.getLastname());
        userRepresentation.setEmail(user.getEmail());
        userRepresentation.setEmailVerified(true);
        userRepresentation.setGroups(groups);

        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setValue(user.getPassword());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        List<CredentialRepresentation> credentials = new ArrayList<>();
        credentials.add(credentialRepresentation);

        userRepresentation.setCredentials(credentials);

        RealmResource realmResource = keycloak.realm(REALM_NAME);
        UsersResource usersResource = realmResource.users();

        Response response = usersResource.create(userRepresentation);

        if(Objects.equals(201, response.getStatus())){
            UserRepresentation keycloakUser = getUserByEmail(user.getEmail());
            Role role = Role.builder()
                    .userRole(user.getRoles().getUserRole())
                    .projectRole(user.getRoles().getProjectRole())
                    .adminRole(user.getRoles().getAdminRole())
                    .build();
            roleRepository.save(role);
            User newUser = User.builder()
                    .sub(keycloakUser.getId())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .acronym(user.getAcronym())
                    .username(user.getUsername())
                    .phone(user.getPhone())
                    .email(user.getEmail())
                    .roles(role)
                    .password(user.getPassword())
                    .build();
            userRepository.save(newUser);
            log.info("Status: " + String.valueOf(response.getStatus()) +" - User " + user.getUsername() + " created");
            return new ResponseEntity<>(
                    "User " + user.getUsername() + " created" ,
                    HttpStatus.CREATED);
        }
        else{
            log.warn("Status: " + String.valueOf(response.getStatus()) +" - User "+ user.getUsername() + "already exists");
            return new ResponseEntity<>(
                    "User " + user.getUsername() + " already exists",
                    HttpStatus.CONFLICT);
        }
    }

    private UsersResource getUserResource(){
        RealmResource proMa = keycloak.realm("ProMa");
        return proMa.users();
    }

    public UserRepresentation getUserByEmail(String email) {
        List<UserRepresentation> users = keycloak.realm(REALM_NAME)
                .users()
                .searchByEmail(email, true);

        return users.getFirst();
    }
    public UserRepresentation getUserByUsername(String username) {
        List<UserRepresentation> users = keycloak.realm(REALM_NAME)
                .users()
                .searchByUsername(username, true);

        return users.getFirst();
    }

    public void deleteUser(String sub){
        User deleteUser = userRepository.findUserBySub(sub);
        if(deleteUser != null){
            userRepository.delete(deleteUser);
            getUserResource().delete(deleteUser.getSub());
            log.info("User " + deleteUser.getUsername() + " deleted");
        }else log.error("User with id " + sub +" does not exist in DB");
    }
}
