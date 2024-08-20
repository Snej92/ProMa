package org.sysprotec.restapi.service.settings;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.overview.TechnicalData;
import org.sysprotec.restapi.model.settings.TechnicalDataSetting;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.overview.TechnicalDataRepository;
import org.sysprotec.restapi.repository.settings.TechnicalDataSettingRepository;
import org.sysprotec.restapi.service.overview.TechnicalDataService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TechnicalDataSettingService {
    private final TechnicalDataSettingRepository technicalDataSettingRepository;
    private final TechnicalDataRepository technicalDataRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TechnicalDataService technicalDataService;

    public List<TechnicalDataSetting> getTechnicalDataSetting() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                return technicalDataSettingRepository.findAllByProjectIdOrderByIdAsc(user.getActiveProject());
            }
        }
        return null;
    }

    public TechnicalDataSetting addTechnicalDataSetting(TechnicalDataSetting technicalDataSetting) {
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
                    //add TechnicalDataSetting to Project
                    technicalDataSetting.setProject(saveProject);
                    saveProject.addTechnicalData(technicalDataSetting);

                    projectRepository.save(saveProject);

                    log.info("TechnicalDataSetting Punkt: '" + technicalDataSetting.getItem() + "' zu '" + saveProject.getName() + "' hinzugefügt");
                    TechnicalDataSetting newTechnicalDataSetting = technicalDataSettingRepository.findTopByOrderByIdDesc();
                    technicalDataService.createTechnicalDataForStations(newTechnicalDataSetting);

                    return newTechnicalDataSetting;
                }
            }
        }
        return null;
    }

    @Transactional
    public void updateTechnicalDataSetting(TechnicalDataSetting technicalDataSetting) {
        Optional<TechnicalDataSetting> optionalTechnicalDataSetting = technicalDataSettingRepository.findById(technicalDataSetting.getId());
        if(optionalTechnicalDataSetting.isEmpty()){
            log.error("TechnicalData with id "+ technicalDataSetting.getId() + " does not exist in database");
        } else {
            TechnicalDataSetting saveTechnicalDataSetting = optionalTechnicalDataSetting.get();
            saveTechnicalDataSetting.setItem(technicalDataSetting.getItem());
            saveTechnicalDataSetting.setUnit(technicalDataSetting.getUnit());
            log.info("TechnicalData with id " + technicalDataSetting.getId() + " updated");
        }
    }

    public void deleteTechnicalDataSetting(Long technicalDataSettingId) {
        Optional<TechnicalDataSetting> optionalTechnicalDataSetting = technicalDataSettingRepository.findById(technicalDataSettingId);
        Optional<Project> optionalProject = projectRepository.findProjectByTechnicalDataSettingId(technicalDataSettingId);
        if(optionalTechnicalDataSetting.isEmpty() || optionalProject.isEmpty()){
            log.error("TechnicalData setting with id "+ technicalDataSettingId + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            List<Station> stationList = saveProject.getStations();
            for (Station station : stationList) {
                station.removeTechnicalData(technicalDataSettingId);
                log.info("Technische Daten : '" + optionalTechnicalDataSetting.get().getItem() + "' von '" + station.getName() + "' entfernt");
            }
            List<TechnicalData> technicalDataList = technicalDataRepository.findAllByTechnicalDataSettingIdOrderByIdAsc(technicalDataSettingId);
            technicalDataRepository.deleteAll(technicalDataList);

            saveProject.removeTechnicalData(technicalDataSettingId);
            log.info("Technische Daten : '" + optionalTechnicalDataSetting.get().getItem() + "' von '" + saveProject.getName() + "' entfernt");
            technicalDataSettingRepository.deleteById(technicalDataSettingId);
        }
    }
}
