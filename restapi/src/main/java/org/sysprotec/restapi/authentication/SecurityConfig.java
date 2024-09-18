package org.sysprotec.restapi.authentication;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final JwtAuthConverter jwtAuthConverter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request
                        -> request
                        .requestMatchers("/swagger-ui.html",
                                "/swagger-ui/**",
                                "/swagger-resources/**",
                                "/swagger-resources",
                                "/v3/api-docs/**",
                                "/proxy/**",
                                "/ws-endpoint/**",
                                "/socket.io/**").permitAll()
                        .anyRequest().authenticated());
        http
                .oauth2ResourceServer(configurer
                        -> configurer.jwt(jwtConfigurer
                        -> jwtConfigurer.jwtAuthenticationConverter(jwtAuthConverter)));
        http
                .sessionManagement(session
                        ->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}