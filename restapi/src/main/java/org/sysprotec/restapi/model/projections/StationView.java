package org.sysprotec.restapi.model.projections;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import org.sysprotec.restapi.model.History;
import org.sysprotec.restapi.model.overview.HeaderData;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.overview.TechnicalData;

import java.util.List;

public interface StationView {
    Integer getId();
    String getName();
    String getDescription();
    String getIssuerAcronym();
    String getIssuerName();
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