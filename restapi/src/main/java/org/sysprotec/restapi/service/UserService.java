package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public User getLoggedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken))
        {
            String username = authentication.getName();
            if(userRepository.findUserByUsernameIgnoreCase(username) != null){
                return userRepository.findUserByUsernameIgnoreCase(username);
            } else{
                //Todo: user löschen und ohne probieren
                User user = User.builder()
                        .firstname("bitte einloggen")
                        .build();
                return user;
            }
        }
        return null;
    }


    public void SyncUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            String sub = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("sub"));
            String username = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("preferred_username"));
            String firstname = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("given_name"));
            String lastname = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("family_name"));
            String email = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("email"));

            User user = User.builder()
                    .sub(sub)
                    .username(username)
                    .firstname(firstname)
                    .lastname(lastname)
                    .email(email)
                    .build();

            User saveUser = user;
            Optional<User> optionalUser = userRepository.getUserBySub(user.getSub());

            if (optionalUser.isPresent()) {
                saveUser = optionalUser.get();
                saveUser.setUsername(user.getUsername());
                saveUser.setLastname(user.getLastname());
                saveUser.setFirstname(user.getFirstname());
                saveUser.setEmail(user.getEmail());
            }

            userRepository.save(saveUser);
            log.info("user " + saveUser.getUsername() +" synchronized with database");
        }
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    //Updates only the active Project!! - add more if needed
    @Transactional
    public User updateUser(User user) {
        if(user != null){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                String username = authentication.getName();
                User loggedUser = userRepository.findUserByUsernameIgnoreCase(username);
                if (loggedUser != null) {
                    loggedUser.setActiveProject(user.getActiveProject());
                    return loggedUser;
                }
            }
        }
        return null;
    }
}