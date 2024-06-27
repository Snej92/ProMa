package org.sysprotec.restapi.model.projections;

import org.sysprotec.restapi.model.settings.TaskSetting;

import java.util.List;

public interface ProjectView {
    Integer getId();
    String getName();
    String getDescription();
    Boolean getFavorite();
    Integer getAmountStations();
    Integer getInProgressStations();
    Integer getStoredStations();
    Integer getNotStoredStations();
    List<TaskSetting> getDocumentationSetting();
    List<TaskSetting> getControlSetting();
    List<TaskSetting> getSpecificationSetting();
    List<TaskSetting> getProjectionSetting();
}
