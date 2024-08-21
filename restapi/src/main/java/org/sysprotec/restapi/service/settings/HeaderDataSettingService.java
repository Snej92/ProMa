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
import org.sysprotec.restapi.model.overview.HeaderData;
import org.sysprotec.restapi.model.settings.HeaderDataSetting;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.overview.HeaderDataRepository;
import org.sysprotec.restapi.repository.settings.HeaderDataSettingRepository;
import org.sysprotec.restapi.service.overview.HeaderDataService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class HeaderDataSettingService {
    private final HeaderDataSettingRepository headerDataSettingRepository;
    private final HeaderDataRepository headerDataRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final HeaderDataService headerDataService;

    public List<HeaderDataSetting> getHeaderDataSetting() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                return headerDataSettingRepository.findAllByProjectIdOrderByIdAsc(user.getActiveProject());
            }
        }
        return null;
    }

    public HeaderDataSetting addHeaderDataSetting(HeaderDataSetting headerDataSetting) {
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
                    //add HeaderDataSetting to Project
                    headerDataSetting.setProject(saveProject);
                    saveProject.addHeaderData(headerDataSetting);

                    projectRepository.save(saveProject);

                    log.info("HeaderDataSetting Punkt: '" + headerDataSetting.getItem() + "' zu '" + saveProject.getName() + "' hinzugefügt");
                    HeaderDataSetting newHeaderDataSetting = headerDataSettingRepository.findTopByOrderByIdDesc();
                    headerDataService.createHeaderDataForStations(newHeaderDataSetting, "");

                    return newHeaderDataSetting;
                }
            }
        }
        return null;
    }

    @Transactional
    public void updateHeaderDataSetting(HeaderDataSetting headerDataSetting) {
        Optional<HeaderDataSetting> optionalHeaderDataSetting = headerDataSettingRepository.findById(headerDataSetting.getId());
        if(optionalHeaderDataSetting.isEmpty()){
            log.error("HeaderData with id "+ headerDataSetting.getId() + " does not exist in database");
        } else {
            HeaderDataSetting saveHeaderDataSetting = optionalHeaderDataSetting.get();
            saveHeaderDataSetting.setItem(headerDataSetting.getItem());
            saveHeaderDataSetting.setType(headerDataSetting.getType());
            log.info("HeaderData with id " + headerDataSetting.getId() + " updated");
        }
    }

    public void deleteHeaderDataSetting(Long headerDataSettingId) {
        Optional<HeaderDataSetting> optionalHeaderDataSetting = headerDataSettingRepository.findById(headerDataSettingId);
        Optional<Project> optionalProject = projectRepository.findProjectByHeaderDataSettingId(headerDataSettingId);
        if(optionalHeaderDataSetting.isEmpty() || optionalProject.isEmpty()){
            log.error("HeaderData setting with id "+ headerDataSettingId + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            List<Station> stationList = saveProject.getStations();
            for (Station station : stationList) {
                station.removeHeaderData(headerDataSettingId);
                log.info("Kopfdaten : '" + optionalHeaderDataSetting.get().getItem() + "' von '" + station.getName() + "' entfernt");
            }
            List<HeaderData> headerDataList = headerDataRepository.findAllByHeaderDataSettingIdOrderByIdAsc(headerDataSettingId);
            headerDataRepository.deleteAll(headerDataList);

            saveProject.removeHeaderData(headerDataSettingId);
            log.info("Kopfdaten : '" + optionalHeaderDataSetting.get().getItem() + "' von '" + saveProject.getName() + "' entfernt");
            headerDataSettingRepository.deleteById(headerDataSettingId);
        }
    }
}
