package org.sysprotec.restapi.model.deserialization;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.projections.ProjectView;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectViewImpl implements ProjectView {
    private Long id;
    private Boolean archived;
    private String color;
    private String acronym;
    private String name;
    private String description;
    private Integer amountStations;
    private Integer inProgressStations;
    private Integer storedStations;
    private Integer notStoredStations;
}
