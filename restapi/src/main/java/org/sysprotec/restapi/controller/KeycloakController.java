package org.sysprotec.restapi.controller;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasRole('backend_admin')")
    @PostMapping("/keycloak")
    public ResponseEntity<String> createUser(@RequestBody User user){
        return keycloakService.createUser(user);
    }

    //todo: add ResponseEntity
    @PreAuthorize("hasRole('backend_admin')")
    @DeleteMapping("/keycloak")
    public void deleteUser(@RequestParam String sub){
        keycloakService.deleteUser(sub);
    }

    //todo: add ResponseEntity
    @PreAuthorize("hasRole('backend_admin')")
    @PutMapping("/keycloak")
    public void updateUser(@RequestBody User user){
        keycloakService.deleteUser(user.getSub());
        keycloakService.createUser(user);
    }
}
