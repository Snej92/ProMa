package org.sysprotec.restapi.service.overview;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.project.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.overview.TechnicalData;
import org.sysprotec.restapi.model.settings.TechnicalDataSetting;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.overview.TechnicalDataRepository;
import org.sysprotec.restapi.service.HistoryService;
import org.sysprotec.restapi.service.UserService;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TechnicalDataService {
    private final StationRepository stationRepository;
    private final TechnicalDataRepository technicalDataRepository;
    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final HistoryService historyService;

    public List<TechnicalData> getTechnicalData(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getTechnicalData() != null) {
                return optionalStation.get().getTechnicalData();
            }
        }
        return null;
    }


    @Transactional
    public TechnicalData updateTechnicalData(TechnicalData technicalData) {
        Optional<TechnicalData> optionalTechnicalData = technicalDataRepository.findById(technicalData.getId());
        if(optionalTechnicalData.isEmpty()){
            log.error("TechnicalData with id "+ technicalData.getId() + " does not exist in database");
        } else {
            String historyText = "";

            TechnicalDataSetting technicalDataSetting = optionalTechnicalData.get().getTechnicalDataSetting();
            TechnicalData saveTechnicalData = optionalTechnicalData.get();

            //Todo History entries

            saveTechnicalData.setTechnicalDataSetting(technicalDataSetting);
            saveTechnicalData.setValue(technicalData.getValue());

            User user = userService.getLoggedUser();


            historyService.newEntryAuto(
                    saveTechnicalData.getStation().getId(),
                    historyText);
            return saveTechnicalData;
        }
        return null;
    }


    public void createTechnicalDataForStations(TechnicalDataSetting technicalDataSetting) {
        if(technicalDataSetting != null){
            Optional<Project> optionalProject = projectRepository.findProjectById(technicalDataSetting.getProject().getId());
            if(optionalProject.isPresent()) {
                List<Station> stationList = optionalProject.get().getStations();
                for(Station station : stationList) {
                    if (stationRepository.findStationByNameAndTechnicalDataTechnicalDataSettingId(station.getName(), technicalDataSetting.getId()).isEmpty()) {
                        TechnicalData technicalData = TechnicalData.builder()
                                .technicalDataSetting(technicalDataSetting)
                                .value("")
                                .station(station)
                                .build();
                        technicalDataRepository.save(technicalData);
                        log.info("Added TechnicalData TechnicalData '" + technicalData.getTechnicalDataSetting().getItem() + "' to station '" + station.getName() + "'");
                    }
                }
            }
        }
    }
}
