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
    private Integer amountStations;
    private Integer inProgressStations;
    private Integer storedStations;
    private Integer notStoredStations;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<Version> versions;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Station> stations;
    //Settings
    @OneToMany(cascade = CascadeType.ALL)
    private List<LopSetting> lopSetting;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> documentation;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> control;
    @OneToMany(cascade = CascadeType.ALL)
    private List<HeaderData> headerData;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> specification;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> projection;
    @OneToMany(cascade = CascadeType.ALL)
    private List<TechnicalData> technicalData;



    //Version
    public void addVersion(Version version){
        this.versions.add(version);
    }

    public void removeVersion(Integer versionId) {
        Version version = this.versions.stream().filter(t -> t.getId() == versionId).findFirst().orElse(null);
        if (version != null) {
            this.versions.remove(version);
        }
    }

    //Station
    public void addStation(Station station){
        this.stations.add(station);
    }

    public void removeStation(Integer stationId) {
        Station station = this.stations.stream().filter(t -> t.getId() == stationId).findFirst().orElse(null);
        if (station != null) {
            this.stations.remove(station);
        }
    }

    //Lop
    public void addLop(LopSetting lopSetting){
        this.lopSetting.add(lopSetting);
    }

    public void removeLop(Integer lopId) {
        LopSetting lopSetting = this.lopSetting.stream().filter(t -> t.getId() == lopId).findFirst().orElse(null);
        if (lopSetting != null) {
            this.lopSetting.remove(lopSetting);
        }
    }

    //Documentation
    public void addDocumentation(Task documentation){
        this.documentation.add(documentation);
    }

    public void removeDocumentation(Integer documentationId) {
        Task documentation = this.documentation.stream().filter(t -> t.getId() == documentationId).findFirst().orElse(null);
        if (documentation != null) {
            this.documentation.remove(documentation);
        }
    }

    //Control
    public void addControl(Task control){
        this.control.add(control);
    }

    public void removeControl(Integer controlId) {
        Task control = this.control.stream().filter(t -> t.getId() == controlId).findFirst().orElse(null);
        if (control != null) {
            this.control.remove(control);
        }
    }

    //HeaderData
    public void addHeaderData(HeaderData headerData){
        this.headerData.add(headerData);
    }

    public void removeHeaderData(Integer headerDataId) {
        HeaderData headerData = this.headerData.stream().filter(t -> t.getId() == headerDataId).findFirst().orElse(null);
        if (headerData != null) {
            this.headerData.remove(headerData);
        }
    }

    //Specification
    public void addSpecification(Task specification){
        this.specification.add(specification);
    }

    public void removeSpecification(Integer specificationId) {
        Task specification = this.specification.stream().filter(t -> t.getId() == specificationId).findFirst().orElse(null);
        if (specification != null) {
            this.specification.remove(specification);
        }
    }

    //Projection
    public void addProjection(Task projection){
        this.projection.add(projection);
    }

    public void removeProjection(Integer projectionId) {
        Task projection = this.projection.stream().filter(t -> t.getId() == projectionId).findFirst().orElse(null);
        if (projection != null) {
            this.projection.remove(projection);
        }
    }

    //TechnicalData
    public void addTechnicalData(TechnicalData technicalData){
        this.technicalData.add(technicalData);
    }

    public void removeTechnicalData(Integer technicalDataId) {
        TechnicalData technicalData = this.technicalData.stream().filter(t -> t.getId() == technicalDataId).findFirst().orElse(null);
        if (technicalData != null) {
            this.technicalData.remove(technicalData);
        }
    }
}
