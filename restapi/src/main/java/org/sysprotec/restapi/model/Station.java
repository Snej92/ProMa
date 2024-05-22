package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.types.StatusEPLAN;

import java.util.List;

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
    private String issuer;
    @Enumerated(EnumType.STRING)
    private StatusEPLAN status;
    private Integer totalProgress;
    private String version;
    //Progress
    //LOP
    private Integer lopTotal;
    private Integer lopDone;
    private Integer lopToDo;
    private Integer lopProgress;
    //Documentation
    private Integer documentationTotal;
    private Integer documentationDone;
    private Integer documentationToDo;
    private Integer documentationProgress;
    //Specification
    private Integer specificationTotal;
    private Integer specificationDone;
    private Integer specificationToDo;
    private Integer specificationProgress;
    //Control
    private Integer controlTotal;
    private Integer controlDone;
    private Integer controlToDo;
    private Integer controlProgress;
    //Tables
    @OneToMany(cascade = CascadeType.ALL)
    private List<History> history;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Lop> lop;
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


    //History
    public void addHistory(History history){
        this.history.add(history);
    }

    public void removeHistory(Integer historyId) {
        History history = this.history.stream().filter(t -> t.getId() == historyId).findFirst().orElse(null);
        if (history != null) {
            this.history.remove(history);
        }
    }

    //Lop
    public void addLop(Lop lop){
        this.lop.add(lop);
    }

    public void removeLop(Integer lopId) {
        Lop lop = this.lop.stream().filter(t -> t.getId() == lopId).findFirst().orElse(null);
        if (lop != null) {
            this.lop.remove(lop);
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
