package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.service.KeycloakService;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class KeycloakController {

    private final KeycloakService keycloakService;

    @GetMapping("/keycloak")
    public UserRepresentation getUser(Principal principal){
        return keycloakService.getUserByUsername(principal.getName());
    }

//    @PreAuthorize("hasRole('client_admin')")
    @PostMapping("/keycloak")
    public ResponseEntity<User> createUser(@RequestBody User user){
        return keycloakService.createUser(user);
    }

    //todo: add ResponseEntity
//    @PreAuthorize("hasRole('client_admin')")
    @DeleteMapping("/keycloak/{sub}")
    public void deleteUser(@PathVariable String sub){
        keycloakService.deleteUser(sub, false);
    }

    //todo: add ResponseEntity
//    @PreAuthorize("hasRole('backend_admin')")
    @PutMapping("/keycloak")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        keycloakService.deleteUser(user.getSub(), true);
        return keycloakService.createUser(user);
    }
}
