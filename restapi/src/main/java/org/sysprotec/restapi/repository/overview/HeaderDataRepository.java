package org.sysprotec.restapi.repository.overview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.sysprotec.restapi.model.overview.HeaderData;

import java.util.List;

@Repository
public interface HeaderDataRepository extends JpaRepository<HeaderData, Long> {
    List<HeaderData> findAllByHeaderDataSettingId(Long headerDataSettingId);
    List<HeaderData> findAllByOrderByIdDesc();
    HeaderData findTopByOrderByIdDesc();
}
