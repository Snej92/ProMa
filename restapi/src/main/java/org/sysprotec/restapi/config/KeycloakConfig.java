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

    private String authServerUrl = "http://localhost:8081";
    private String adminClientSecret = "oLluQ2Qqi555OIm4tEjW5hOwXNAmPCdb";
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
            log.warn("Keycloak is null");
        }else log.info("Keycloak created");

        return keycloak;
    }
}