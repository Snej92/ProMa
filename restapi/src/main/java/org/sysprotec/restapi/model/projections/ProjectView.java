package org.sysprotec.restapi.model.projections;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.sysprotec.restapi.model.deserialization.ProjectViewImpl;

@JsonDeserialize(as = ProjectViewImpl.class)
public interface ProjectView {
    Long getId();
    Boolean getArchived();
    String getColor();
    String getAcronym();
    String getName();
    String getDescription();
    Integer getAmountStations();
    Integer getInProgressStations();
    Integer getStoredStations();
    Integer getNotStoredStations();
}