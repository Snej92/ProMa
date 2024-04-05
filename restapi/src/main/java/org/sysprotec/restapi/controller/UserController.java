package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.service.UserService;

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
}
