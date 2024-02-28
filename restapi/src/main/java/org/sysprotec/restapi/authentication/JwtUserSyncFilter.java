package org.sysprotec.restapi.authentication;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.service.UserService;

import java.io.IOException;

public class JwtUserSyncFilter
        extends OncePerRequestFilter {

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
        throws ServletException, IOException {
        try{
            JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            String firstname = String.valueOf(token.getTokenAttributes().get("given_name"));
            String lastname = String.valueOf(token.getTokenAttributes().get("family_name"));
            String email = String.valueOf(token.getTokenAttributes().get("email"));

            User user = User.builder()
                    .firstname(firstname)
                    .lastname(lastname)
                    .email(email)
                    .build();

            userService.SyncUser(user);

        } catch (Exception e) {
            throw new IllegalArgumentException("Unable to auth user");
        }

        filterChain.doFilter(request, response);
    }
}
