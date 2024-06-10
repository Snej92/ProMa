package org.sysprotec.restapi.service.settings;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.model.settings.LopSetting;
import org.sysprotec.restapi.model.types.StatusLOP;
import org.sysprotec.restapi.repository.*;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class LopSettingService {

    private final LopSettingRepository lopSettingRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final StationRepository stationRepository;

    public List<LopSetting> getSettingLop() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                if (optionalProject.isPresent()) {
                    return optionalProject.get().getLopSetting();
                } else log.error("Project with ID" + user.getActiveProject() + " does not exist in database");
            }
        }
        return null;
    }

    public LopSetting addSettingLop(LopSetting lopSetting) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                if (optionalProject.isEmpty()) {
                    log.error("Project with id " + user.getActiveProject() + " does not exist in database");
                } else {
                    Project saveProject = optionalProject.get();
                    //add LOP to Project
                    saveProject.addLop(lopSetting);
                    projectRepository.save(saveProject);
                    log.info("LOP Punkt: '" + lopSetting.getItem() + "' zu '" + saveProject.getName() + "' hinzugefügt");
                    //add LOP to all Stations
                    List<Station> stationList = saveProject.getStations();
                    if (stationList != null) {
                        Lop lop = Lop.builder()
                                .startDate(lopSetting.getStartDate())
                                .id(0)
                                .endDate("")
                                .item(lopSetting.getItem())
                                .status(StatusLOP.OFFEN)
                                .userAcronym("")
                                .build();
                        for (Station station : stationList) {
                            station.addLop(lop);
                            stationRepository.save(station);
                            log.info("LOP Punkt: '" + lop.getItem() + "' zu '" + station.getName() + "' hinzugefügt");
                        }
                    }
                    return lopSettingRepository.findTopByOrderByIdDesc();
                }
            }
        }
        return null;
    }

    @Transactional
    public void updateSettingLop(LopSetting lopSetting) {
        Optional<LopSetting> optionalLopSetting = lopSettingRepository.findLopById(lopSetting.getId());
        if(optionalLopSetting.isEmpty()){
            log.error("LOP with id "+ lopSetting.getId() + " does not exist in database");
        } else {
            LopSetting saveLop = optionalLopSetting.get();
            saveLop.setItem(lopSetting.getItem());
            saveLop.setStartDate(lopSetting.getStartDate());
        }
    }

    public void delete(Integer lopId) {
        Optional<LopSetting> optionalLopSetting = lopSettingRepository.findLopById(lopId);
        Optional<Project> optionalProject = projectRepository.findProjectByLopSettingId(lopId);
        if(optionalLopSetting.isEmpty() || optionalProject.isEmpty()){
            log.error("LOP with id "+ lopId + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            List<Station> stationList = saveProject.getStations();
            for (Station station : stationList) {
                station.removeLop(lopId);
                log.info("LOP Punkt: '" + optionalLopSetting.get().getItem() + "' von '" + station.getName() + "' entfernt");
            }
            saveProject.removeLop(lopId);
            log.info("LOP Punkt: '" + optionalLopSetting.get().getItem() + "' von '" + saveProject.getName() + "' entfernt");
            lopSettingRepository.deleteById(lopId);
        }
    }

//    public List<Lop> getStationLop(Integer stationId) {
//        Optional<Station> optionalStation = stationRepository.findById(stationId);
//        if (optionalStation.isPresent()) {
//            if(optionalStation.get().getLop() != null) {
//                return optionalStation.get().getLop();
//            }
//        }
//        return null;
//    }
}