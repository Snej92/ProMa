package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ROLE_ID_GEN")
    @SequenceGenerator(name = "ROLE_ID_GEN", sequenceName = "ROLE_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private Boolean adminRole;
    private Boolean projectRole;
    private Boolean userRole;
}
