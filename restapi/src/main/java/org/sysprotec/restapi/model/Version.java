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
public class Version {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String date;
    private String version;
    private String toDo;
    private Boolean done;
    @OneToMany(cascade = CascadeType.ALL)
    private List<VersionStation> versionStation;

    public void addVersionStation(VersionStation versionStation){
        this.versionStation.add(versionStation);
    }

    public void removeVersionStation(Integer versionStationId) {
        VersionStation versionStation = this.versionStation.stream().filter(t -> t.getId() == versionStationId).findFirst().orElse(null);
        if (versionStation != null) {
            this.versionStation.remove(versionStation);
        }
    }
}
