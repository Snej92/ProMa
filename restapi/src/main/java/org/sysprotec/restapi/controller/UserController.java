package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.service.UserService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasRole('backend_admin')")
    @GetMapping("/user")
    public User getUser(){
        return userService.getLoggedUser();
    }
}
