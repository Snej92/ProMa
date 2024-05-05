package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

//    @PreAuthorize("hasRole('backend_admin')")
    @GetMapping
    public User getUser(){
        return userService.getLoggedUser();
    }

    @GetMapping("/all")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @GetMapping("/sync")
    public void syncUser(){
        userService.SyncUser();
    }
}
