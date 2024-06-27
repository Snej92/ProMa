package org.sysprotec.restapi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.sysprotec.restapi.model.Role;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.repository.RoleRepository;
import org.sysprotec.restapi.repository.UserRepository;

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
                .firstname("Test")
                .lastname("Admin")
                .acronym("TAD")
                .email("admin@admin.com")
                .phone("geheim")
                .username("admin@admin.com")
                .password("test")
                .roles(roleAll)
                .activeProject(1L)
                .build();
//
//        User BWA = User.builder()
//                .firstname("Bernd")
//                .lastname("Waegner")
//                .acronym("BWA")
//                .email("b.waegner@sysprotec.de")
//                .phone("+49 911 ...")
//                .username("bernd.waegner")
//                .password("password")
//                .roles(roleBWA)
//                .build();
//
        return args -> userRepository.saveAll(List.of(
                Admin));
    }
}
