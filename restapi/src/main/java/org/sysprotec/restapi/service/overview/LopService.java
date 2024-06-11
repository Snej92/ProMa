package org.sysprotec.restapi.service.overview;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.model.settings.LopSetting;
import org.sysprotec.restapi.model.types.StatusLOP;
import org.sysprotec.restapi.repository.overview.LopRepository;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.service.UserService;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class LopService {

    private final StationRepository stationRepository;
    private final LopRepository lopRepository;
    private final UserService userService;
    private final ProjectRepository projectRepository;

    public List<Lop> getStationLop(Integer stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getLop() != null) {
                return optionalStation.get().getLop();
            }
        }
        return null;
    }

    @Transactional
    public Lop updateLop(Lop lop) {
        Optional<Lop> optionalLop = lopRepository.findLopById(lop.getId());
        if(optionalLop.isEmpty()){
            log.error("LOP with id "+ lop.getId() + " does not exist in database");
        } else {
            LopSetting lopSetting = optionalLop.get().getLopSetting();
            Lop saveLop = optionalLop.get();
            saveLop.setLopSetting(lopSetting);
            saveLop.setLopSetting(lopSetting);
            saveLop.setEndDate(lop.getEndDate());
            saveLop.setStatus(lop.getStatus(), userService.getLoggedUser());
            return saveLop;
        }
        return null;
    }

    public void createLopForStations(LopSetting lopSetting) {
        Optional<Project> optionalProject = projectRepository.findProjectById(lopSetting.getProject().getId());
        if(optionalProject.isPresent()) {
            List<Station> stationList = optionalProject.get().getStations();
            for(Station station : stationList) {
                if (stationRepository.findStationByNameAndLopLopSettingId(station.getName(), lopSetting.getId()).isEmpty()) {
                    Lop lop = Lop.builder()
                            .lopSetting(lopSetting)
                            .station(station)
                            .endDate("")
                            .status(StatusLOP.OFFEN)
                            .userAcronym("")
                            .build();
                    lopRepository.save(lop);
                    log.info("Added LOP '" + lop.getLopSetting().getItem() + "' to station '" + station.getName() + "'");
                }
            }
        }
    }
}