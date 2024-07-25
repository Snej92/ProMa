package org.sysprotec.restapi.config;

import lombok.extern.slf4j.Slf4j;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class KeycloakConfig {

    private String authServerUrl = "https://kc.snejcloud.de/";
    //Arbeits Laptop
//    private String adminClientSecret = "dZwaCJrCVnaEpV3LmIAQD0ts3DoSItu5";
    //Home
    private String adminClientSecret = "8tZR1kmBNEyX4q8u9Hp5WiW3FFvX63IT";
    private String realm = "ProMa";
    private String clientId = "admin-cli";
    @Bean
    public Keycloak keycloak(){

        Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(authServerUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(adminClientSecret)
                .build();

        if (keycloak == null){
            log.error("Keycloak is null");
        }else log.info("Keycloak created");

        return keycloak;
    }
}
