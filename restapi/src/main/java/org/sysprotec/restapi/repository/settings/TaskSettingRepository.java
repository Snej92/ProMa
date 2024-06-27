package org.sysprotec.restapi.repository.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.settings.TaskSetting;

import java.util.List;

@Repository
public interface TaskSettingRepository extends JpaRepository<TaskSetting, Long> {
    TaskSetting findTopByOrderByIdDesc();
    List<TaskSetting> findAllByProjectIdAndTypeOrderByIdDesc(Long projectId, String type);
}
