package org.sysprotec.restapi.authentication;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.service.UserService;

import java.io.IOException;

//todo: Maybe not needed, cause user´s will be updated through user screen
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtUserSyncFilter
        extends OncePerRequestFilter
{
    private final UserService userService;

//    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)) {
            JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            String username = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("preferred_username"));
            String firstname = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("given_name"));
            String lastname = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("family_name"));
            String email = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("email"));
            String sub = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("sub"));

            User user = User.builder()
                    .username(username)
                    .firstname(firstname)
                    .lastname(lastname)
                    .email(email)
                    .sub(sub)
                    .build();

            userService.SyncUser(user);
        }
        else log.warn("Unable to auth user");
        filterChain.doFilter(request, response);
    }
}