package org.sysprotec.restapi.model.projections;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.sysprotec.restapi.model.deserialization.StationViewImpl;
import org.sysprotec.restapi.model.types.StatusEPLAN;


@JsonDeserialize(as = StationViewImpl.class)
public interface StationView {
    Long getId();
    String getName();
    String getDescription();
    String getIssuerAcronym();
    String getIssuerName();
    StatusEPLAN getStatus();
    String getVersion();
    Integer getTotalProgress();
    //Progress
    //LOP
    Integer getLopTotal();
    Integer getLopDone();
    Integer getLopToDo();
    Integer getLopProgress();
    //Documentation
    Integer getDocumentationTotal();
    Integer getDocumentationDone();
    Integer getDocumentationToDo();
    Integer getDocumentationProgress();
    //Specification
    Integer getSpecificationTotal();
    Integer getSpecificationDone();
    Integer getSpecificationToDo();
    Integer getSpecificationProgress();
    //Control
    Integer getControlTotal();
    Integer getControlDone();
    Integer getControlToDo();
    Integer getControlProgress();
    //Projection
    Integer getProjectionTotal();
    Integer getProjectionDone();
    Integer getProjectionToDo();
    Integer getProjectionProgress();
}