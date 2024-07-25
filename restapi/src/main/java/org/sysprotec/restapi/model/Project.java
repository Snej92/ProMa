package org.sysprotec.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.settings.HeaderDataSetting;
import org.sysprotec.restapi.model.settings.LopSetting;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.model.settings.TechnicalDataSetting;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"stations"})
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROJECT_ID_GEN")
    @SequenceGenerator(name = "PROJECT_ID_GEN", sequenceName = "PROJECT_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String name;
    private String description;
    private Integer amountStations;
    private Integer inProgressStations;
    private Integer storedStations;
    private Integer notStoredStations;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<Version> versions;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<Station> stations;
    //Settings
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<LopSetting> lopSetting;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<TaskSetting> documentationSetting;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<TaskSetting> controlSetting;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<HeaderDataSetting> headerDataSetting;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<TaskSetting> specificationSetting;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<TaskSetting> projectionSetting;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<TechnicalDataSetting> technicalDataSetting;

    //Version
    public void addVersion(Version version) {
        this.versions.add(version);
    }

    public void removeVersion(Long versionId) {
        Version version = this.versions.stream().filter(t -> t.getId() == versionId).findFirst().orElse(null);
        if (version != null) {
            this.versions.remove(version);
        }
    }

    //Station
    public void addStation(Station station) {
        this.stations.add(station);
    }

    public void removeStation(Long stationId) {
        Station station = this.stations.stream().filter(t -> t.getId() == stationId).findFirst().orElse(null);
        if (station != null) {
            this.stations.remove(station);
        }
    }

    //Lop
    public void addLop(LopSetting lopSetting) {
        this.lopSetting.add(lopSetting);
    }

    public void removeLop(Long lopId) {
        LopSetting lopSetting = this.lopSetting.stream().filter(t -> t.getId() == lopId).findFirst().orElse(null);
        if (lopSetting != null) {
            this.lopSetting.remove(lopSetting);
        }
    }

    //Documentation
    public void addDocumentation(TaskSetting documentation) {
        this.documentationSetting.add(documentation);
    }

    public void removeDocumentation(Long documentationId) {
        TaskSetting documentation = this.documentationSetting.stream().filter(t -> t.getId() == documentationId).findFirst().orElse(null);
        if (documentation != null) {
            this.documentationSetting.remove(documentation);
        }
    }

    //Control
    public void addControl(TaskSetting control) {
        this.controlSetting.add(control);
    }

    public void removeControl(Long controlId) {
        TaskSetting control = this.controlSetting.stream().filter(t -> t.getId() == controlId).findFirst().orElse(null);
        if (control != null) {
            this.controlSetting.remove(control);
        }
    }

    //HeaderData
    public void addHeaderData(HeaderDataSetting headerData) {
        this.headerDataSetting.add(headerData);
    }

    public void removeHeaderData(Long headerDataId) {
        HeaderDataSetting headerData = this.headerDataSetting.stream().filter(t -> t.getId() == headerDataId).findFirst().orElse(null);
        if (headerData != null) {
            this.headerDataSetting.remove(headerData);
        }
    }

    //Specification
    public void addSpecification(TaskSetting specification) {
        this.specificationSetting.add(specification);
    }

    public void removeSpecification(Long specificationId) {
        TaskSetting specification = this.specificationSetting.stream().filter(t -> t.getId() == specificationId).findFirst().orElse(null);
        if (specification != null) {
            this.specificationSetting.remove(specification);
        }
    }

    //Projection
    public void addProjection(TaskSetting projection) {
        this.projectionSetting.add(projection);
    }

    public void removeProjection(Long projectionId) {
        TaskSetting projection = this.projectionSetting.stream().filter(t -> t.getId() == projectionId).findFirst().orElse(null);
        if (projection != null) {
            this.projectionSetting.remove(projection);
        }
    }

    //TechnicalData
    public void addTechnicalData(TechnicalDataSetting technicalData) {
        this.technicalDataSetting.add(technicalData);
    }

    public void removeTechnicalData(Long technicalDataId) {
        TechnicalDataSetting technicalData = this.technicalDataSetting.stream().filter(t -> t.getId() == technicalDataId).findFirst().orElse(null);
        if (technicalData != null) {
            this.technicalDataSetting.remove(technicalData);
        }
    }
}