package org.sysprotec.restapi.model.projections;


import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.sysprotec.restapi.model.types.StatusEPLAN;

@Setter
@Getter
@Builder
public class StationDto {
    private Long id;
    private String name;
    private String description;
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
    //Projection
    private Integer projectionTotal;
    private Integer projectionDone;
    private Integer projectionToDo;
    private Integer projectionProgress;

    public StationDto(Long id,
                      String name,
                      String description,
                      String issuer,
                      StatusEPLAN status,
                      Integer totalProgress,
                      String version,
                      Integer lopTotal,
                      Integer lopDone,
                      Integer lopToDo,
                      Integer lopProgress,
                      Integer documentationTotal,
                      Integer documentationDone,
                      Integer documentationToDo,
                      Integer documentationProgress,
                      Integer specificationTotal,
                      Integer specificationDone,
                      Integer specificationToDo,
                      Integer specificationProgress,
                      Integer controlTotal,
                      Integer controlDone,
                      Integer controlToDo,
                      Integer controlProgress,
                      Integer projectionTotal,
                      Integer projectionDone,
                      Integer projectionToDo,
                      Integer projectionProgress){
        this.id = id;
        this.name = name;
        this.description = description;
        this.issuer = issuer;
        this.status = status;
        this.totalProgress = totalProgress;
        this.version = version;
        this.lopTotal = lopTotal;
        this.lopDone = lopDone;
        this.lopToDo = lopToDo;
        this.lopProgress = lopProgress;
        this.documentationTotal = documentationTotal;
        this.documentationDone = documentationDone;
        this.documentationToDo = documentationToDo;
        this.documentationProgress = documentationProgress;
        this.specificationTotal = specificationTotal;
        this.specificationDone = specificationDone;
        this.specificationToDo = specificationToDo;
        this.specificationProgress = specificationProgress;
        this.controlTotal = controlTotal;
        this.controlDone = controlDone;
        this.controlToDo = controlToDo;
        this.controlProgress = controlProgress;
        this.projectionTotal = projectionTotal;
        this.projectionDone = projectionDone;
        this.projectionToDo = projectionToDo;
        this.projectionProgress = projectionProgress;
    }
}
