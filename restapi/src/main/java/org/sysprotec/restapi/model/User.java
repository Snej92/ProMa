package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private Long id;
    private Long activeProject;
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
    @OneToMany(cascade = CascadeType.ALL)
    private List<ProjectFavorite> projectFavorite;
    @OneToMany(cascade = CascadeType.ALL)
    private List<StationFavorite> stationFavorite;

    public void addProjectFavorite(ProjectFavorite projectFavorite){
        this.projectFavorite.add(projectFavorite);
    }

    public void removeProjectFavorite(Long projectFavoriteId) {
        ProjectFavorite projectFavorite = this.projectFavorite.stream().filter(t -> t.getId() == projectFavoriteId).findFirst().orElse(null);
        if (projectFavorite != null) {
            this.projectFavorite.remove(projectFavorite);
        }
    }

    public void addStationFavorite(StationFavorite stationFavorite){
        this.stationFavorite.add(stationFavorite);
    }

    public void removeStationFavorite(Long stationFavoriteId) {
        StationFavorite stationFavorite = this.stationFavorite.stream().filter(t -> t.getId() == stationFavoriteId).findFirst().orElse(null);
        if (stationFavorite != null) {
            this.stationFavorite.remove(stationFavorite);
        }
    }
}
