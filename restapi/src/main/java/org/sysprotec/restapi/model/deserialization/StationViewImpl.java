package org.sysprotec.restapi.model.deserialization;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.projections.StationView;
import org.sysprotec.restapi.model.types.StatusEPLAN;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StationViewImpl implements StationView {
    private Long id;
    private String name;
    private String description;
    private String issuerAcronym;
    private String issuerName;
    @Enumerated(EnumType.STRING)
    private StatusEPLAN status;
    private Integer totalProgress;
    private String version;
    private String image;
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
    //Additions
    private String note;
}
