package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.types.StatusEPLAN;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private Boolean favorite;
    private Integer progress;
    @Enumerated(EnumType.STRING)
    private StatusEPLAN status;
}
