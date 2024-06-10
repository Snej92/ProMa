package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name ="USER_")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_ID_GEN")
    @SequenceGenerator(name = "USER_ID_GEN", sequenceName = "USER_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private Integer activeProject;
    private String sub;
    private String firstname;
    private String lastname;
    private String acronym;
    private String email;
    private String phone;
    private String username;
    private String password;
    @OneToOne(cascade = CascadeType.ALL)
    private Role roles;
}
