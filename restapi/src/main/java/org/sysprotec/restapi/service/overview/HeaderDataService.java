package org.sysprotec.restapi.service.overview;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.overview.HeaderData;
import org.sysprotec.restapi.model.settings.HeaderDataSetting;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.overview.HeaderDataRepository;
import org.sysprotec.restapi.service.HistoryService;
import org.sysprotec.restapi.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class HeaderDataService {
    private final StationRepository stationRepository;
    private final HeaderDataRepository headerDataRepository;
    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final HistoryService historyService;

    public List<HeaderData> getHeaderData(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getHeaderData() != null) {
                return headerDataRepository.findAllByStationIdOrderByIdAsc(optionalStation.get().getId());
            }
        }
        return null;
    }


    @Transactional
    public HeaderData updateHeaderData(HeaderData headerData) {
        Optional<HeaderData> optionalHeaderData = headerDataRepository.findById(headerData.getId());
        if(optionalHeaderData.isEmpty()){
            log.error("HeaderData with id "+ headerData.getId() + " does not exist in database");
        } else {
            String historyText = "";

            HeaderDataSetting headerDataSetting = optionalHeaderData.get().getHeaderDataSetting();
            HeaderData saveHeaderData = optionalHeaderData.get();

            //Todo History entries

            saveHeaderData.setHeaderDataSetting(headerDataSetting);
            saveHeaderData.setData(headerData.getData());

            User user = userService.getLoggedUser();


            historyService.newEntryAuto(
                    user,
                    saveHeaderData.getStation().getId(),
                    historyText);
            return saveHeaderData;
        }
        return null;
    }


    public void createHeaderDataForStations(HeaderDataSetting headerDataSetting) {
        if(headerDataSetting != null){
            Optional<Project> optionalProject = projectRepository.findProjectById(headerDataSetting.getProject().getId());
            if(optionalProject.isPresent()) {
                List<Station> stationList = optionalProject.get().getStations();
                for(Station station : stationList) {
                    if (stationRepository.findStationByNameAndHeaderDataHeaderDataSettingId(station.getName(), headerDataSetting.getId()).isEmpty()) {
                        HeaderData headerData = HeaderData.builder()
                                .headerDataSetting(headerDataSetting)
                                .data("")
                                .station(station)
                                .build();
                        headerDataRepository.save(headerData);
                        log.info("Added HeaderData HeaderData '" + headerData.getHeaderDataSetting().getItem() + "' to station '" + station.getName() + "'");
                    }
                }
            }
        }
    }
}
