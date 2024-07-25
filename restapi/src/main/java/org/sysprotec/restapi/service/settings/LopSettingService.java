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
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.settings.LopSetting;
import org.sysprotec.restapi.repository.*;
import org.sysprotec.restapi.repository.overview.LopRepository;
import org.sysprotec.restapi.repository.settings.LopSettingRepository;
import org.sysprotec.restapi.service.overview.LopService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class LopSettingService {

    private final LopSettingRepository lopSettingRepository;
    private final LopRepository lopRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final LopService lopService;

    public List<LopSetting> getLopSetting() {
        List<LopSetting> lopSettings = new ArrayList<>();
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
        return lopSettings;
    }

    public LopSetting addLopSetting(LopSetting lopSetting) {
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
                    //add LOPSetting to Project
                    lopSetting.setProject(saveProject);
                    saveProject.addLop(lopSetting);
                    projectRepository.save(saveProject);
                    log.info("LOPSetting Punkt: '" + lopSetting.getItem() + "' zu '" + saveProject.getName() + "' hinzugefügt");
                    LopSetting newLopSetting = lopSettingRepository.findTopByOrderByIdDesc();
                    lopService.createLopForStations(newLopSetting);
                    return lopSettingRepository.findTopByOrderByIdDesc();
                }
            }
        }
        return null;
    }

    @Transactional
    public void updateLopSetting(LopSetting lopSetting) {
        Optional<LopSetting> optionalLopSetting = lopSettingRepository.findLopById(lopSetting.getId());
        if(optionalLopSetting.isEmpty()){
            log.error("LOP with id "+ lopSetting.getId() + " does not exist in database");
        } else {
            LopSetting saveLop = optionalLopSetting.get();
            saveLop.setItem(lopSetting.getItem());
            saveLop.setStartDate(lopSetting.getStartDate());
            log.info("LOP with id " + lopSetting.getId() + " updated");
        }
    }

    public void deleteLopSetting(Long lopSettingId) {
        Optional<LopSetting> optionalLopSetting = lopSettingRepository.findLopById(lopSettingId);
        Optional<Project> optionalProject = projectRepository.findProjectByLopSettingId(lopSettingId);
        if(optionalLopSetting.isEmpty() || optionalProject.isEmpty()){
            log.error("LOP with id "+ lopSettingId + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            List<Station> stationList = saveProject.getStations();
            for (Station station : stationList) {
                station.removeLop(lopSettingId);
                log.info("LOP Punkt: '" + optionalLopSetting.get().getItem() + "' von '" + station.getName() + "' entfernt");
            }

            List<Lop> lopList = lopRepository.findAllByLopSettingId(lopSettingId);
            lopRepository.deleteAll(lopList);

            saveProject.removeLop(lopSettingId);
            log.info("LOP Punkt: '" + optionalLopSetting.get().getItem() + "' von '" + saveProject.getName() + "' entfernt");
            lopSettingRepository.deleteById(lopSettingId);
        }
    }
}