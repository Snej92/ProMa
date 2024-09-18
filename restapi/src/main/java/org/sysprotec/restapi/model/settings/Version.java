package org.sysprotec.restapi.model.settings;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.project.Project;

import java.util.List;

@JsonIgnoreProperties({"project"})
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Version {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "VERSION_ID_GEN")
    @SequenceGenerator(name = "VERSION_ID_GEN", sequenceName = "VERSION_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
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

    public void removeVersionStation(Long versionStationId) {
        VersionStation versionStation = this.versionStation.stream().filter(t -> t.getId() == versionStationId).findFirst().orElse(null);
        if (versionStation != null) {
            this.versionStation.remove(versionStation);
        }
    }
}
