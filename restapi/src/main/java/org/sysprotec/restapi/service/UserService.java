package org.sysprotec.restapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
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
            return userRepository.findUserByUsernameIgnoreCase(username);
        }
        return null;
    }


    public void SyncUser(User user) {
        if (user == null){
            throw new EntityNotFoundException("Error while user sync");
        }

        User saveUser = user;
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if(optionalUser.isPresent()){
            saveUser = optionalUser.get();
            saveUser.setFirstname(user.getFirstname());
            saveUser.setLastname(user.getLastname());
            saveUser.setSub(user.getSub());
        }

        userRepository.save(saveUser);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}
