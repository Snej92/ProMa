package org.sysprotec.restapi.model.projections;

public interface StationView {
    Integer getId();
    String getName();
    String getDescription();
    String getIssuer();
    String getStatus();
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