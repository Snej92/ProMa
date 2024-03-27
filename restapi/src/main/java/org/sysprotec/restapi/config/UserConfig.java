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

        Role admin = Role.builder()
                .adminRole(true)
                .projectRole(true)
                .userRole(true)
                .build();

        Role project = Role.builder()
                .adminRole(false)
                .projectRole(true)
                .userRole(true)
                .build();

        Role user = Role.builder()
                .adminRole(false)
                .projectRole(false)
                .userRole(true)
                .build();

        roleRepository.saveAll(List.of(
                admin,
                project,
                user));

        User JAR = User.builder()
                .firstname("Jens")
                .lastname("Arth")
                .acronym("JAR")
                .email("j.arth@sysprotec.de")
                .phone("+49 911 ...")
                .username("jens.arth")
                .password("password")
                .roles(user)
                .build();

        User AEL = User.builder()
                .firstname("Andreas")
                .lastname("Elsner")
                .acronym("AEL")
                .email("a.elsner@sysprotec.de")
                .phone("+49 911 ...")
                .username("andreas.elsner")
                .password("password")
                .roles(admin)
                .build();

        User BWA = User.builder()
                .firstname("Bernd")
                .lastname("Waegner")
                .acronym("BWA")
                .email("b.waegner@sysprotec.de")
                .phone("+49 911 ...")
                .username("bernd.waegner")
                .password("password")
                .roles(project)
                .build();

        return args -> userRepository.saveAll(List.of(
                JAR,
                AEL,
                BWA));
    }
}
