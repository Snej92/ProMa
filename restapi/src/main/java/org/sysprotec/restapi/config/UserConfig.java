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
    CommandLineRunner commandLineRunnerSkills(UserRepository userRepository,
                                              RoleRepository roleRepository){

        Role roleJAR = Role.builder()
                .adminRole(true)
                .projectRole(true)
                .userRole(true)
                .build();

        Role roleBWA = Role.builder()
                .adminRole(true)
                .projectRole(true)
                .userRole(true)
                .build();


        User JAR = User.builder()
                .firstname("Jens")
                .lastname("Arth")
                .acronym("JAR")
                .email("j.arth@sysprotec.de")
                .phone("+49 911 ...")
                .username("jens.arth")
                .password("password")
                .roles(roleJAR)
                .build();

        User BWA = User.builder()
                .firstname("Bernd")
                .lastname("Waegner")
                .acronym("BWA")
                .email("b.waegner@sysprotec.de")
                .phone("+49 911 ...")
                .username("bernd.waegner")
                .password("password")
                .roles(roleBWA)
                .build();

        return args -> userRepository.saveAll(List.of(
                JAR,
                BWA));
    }
}
