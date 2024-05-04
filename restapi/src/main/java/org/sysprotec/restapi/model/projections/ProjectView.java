package org.sysprotec.restapi.model.projections;

public interface ProjectView {
    Integer getId();
    String getName();
    String getDescription();
    Boolean getFavorite();
    Integer getAmountStations();
    Integer getInProgressStations();
    Integer getStoredStations();
    Integer getNotStoredStations();
}
