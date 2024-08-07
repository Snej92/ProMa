package org.sysprotec.restapi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.sysprotec.restapi.model.Role;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.service.UserService;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunnerSkills(UserRepository userRepository){

        Role roleAll = Role.builder()
                .adminRole(true)
                .projectRole(true)
                .userRole(true)
                .build();

        User Admin = User.builder()
                .firstname("Admin")
                .lastname("Test")
                .acronym("TAD")
                .email("admin@admin.com")
                .phone("geheim")
                .username("admin@admin.com")
                .password("!FDJEWGQS§pukr9a")
                .roles(roleAll)
                .activeProject(0L)
                .build();
        if (userRepository.findUserByUsernameIgnoreCase("admin@admin.com") == null) {
            userRepository.save(Admin);
        }

        return args -> userRepository.findUserByUsernameIgnoreCase("admin@admin.com");
    }
}