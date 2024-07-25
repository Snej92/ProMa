package org.sysprotec.restapi.repository.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.settings.TechnicalDataSetting;

import java.util.List;

@Repository
public interface TechnicalDataSettingRepository extends JpaRepository<TechnicalDataSetting, Long> {
    List<TechnicalDataSetting> findAllByOrderByIdDesc();
    TechnicalDataSetting findTopByOrderByIdDesc();
}
