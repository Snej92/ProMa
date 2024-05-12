package org.sysprotec.restapi.model.projections;

import lombok.*;


@Setter
@Getter
@Builder
public class ProjectDto {
    private Integer id;
    private String name;
    private String description;
    private Boolean favorite;
    private Integer amountStations;
    private Integer inProgressStations;
    private Integer storedStations;
    private Integer notStoredStations;

    public ProjectDto(Integer id,
                      String name,
                      String description,
                      Boolean favorite,
                      Integer amountStations,
                      Integer inProgressStations,
                      Integer storedStations,
                      Integer notStoredStations){
        this.id = id;
        this.name = name;
        this.description = description;
        this.favorite = favorite;
        this.amountStations = amountStations;
        this.inProgressStations = inProgressStations;
        this.storedStations = storedStations;
        this.notStoredStations = notStoredStations;

    }

}
