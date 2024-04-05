package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private Boolean favorite;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Version> versions;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Station> stations;
}
