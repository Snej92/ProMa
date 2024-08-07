package org.sysprotec.restapi.repository.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.settings.HeaderDataSetting;

import java.util.List;

@Repository
public interface HeaderDataSettingRepository extends JpaRepository<HeaderDataSetting, Long> {
    List<HeaderDataSetting> findAllByOrderByIdAsc();
    HeaderDataSetting findTopByOrderByIdDesc();
}
