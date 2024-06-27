package org.sysprotec.restapi.repository.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.settings.LopSetting;

import java.util.Optional;

@Repository
public interface LopSettingRepository extends JpaRepository<LopSetting, Long> {

    Optional<LopSetting> findLopById(Long Id);
    LopSetting findTopByOrderByIdDesc();
}
