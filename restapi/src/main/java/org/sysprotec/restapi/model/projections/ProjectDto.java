package org.sysprotec.restapi.model.projections;

import lombok.*;


@Setter
@Getter
@Builder
public class ProjectDto {
    private Long id;
    private Boolean archived;
    private String name;
    private String description;
    private Integer amountStations;
    private Integer inProgressStations;
    private Integer storedStations;
    private Integer notStoredStations;

    public ProjectDto(Long id,
                      Boolean archived,
                      String name,
                      String description,
                      Integer amountStations,
                      Integer inProgressStations,
                      Integer storedStations,
                      Integer notStoredStations){
        this.id = id;
        this.archived = archived;
        this.name = name;
        this.description = description;
        this.amountStations = amountStations;
        this.inProgressStations = inProgressStations;
        this.storedStations = storedStations;
        this.notStoredStations = notStoredStations;

    }

}
