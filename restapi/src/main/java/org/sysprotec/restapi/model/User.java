package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

@Entity
@Table(name ="USER_")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
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
