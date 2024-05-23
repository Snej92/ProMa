package org.sysprotec.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIgnoreProperties({"project"})
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
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "version")
    private List<VersionStation> versionStation;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

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
