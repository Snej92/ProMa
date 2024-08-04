package org.sysprotec.restapi.service.overview;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.model.types.StatusLOP;
import org.sysprotec.restapi.repository.overview.LopRepository;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.service.HistoryService;
import org.sysprotec.restapi.service.StationService;
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
    private final HistoryService historyService;
    private final StationService stationService;

    public List<Lop> getStationLop(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getLop() != null) {
                return optionalStation.get().getLop();
            }
        }
        return null;
    }

    public Lop addLop(Long stationId, Lop lop) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getLop() != null) {
                lop.setStation(optionalStation.get());
                lopRepository.save(lop);
                stationService.updateStationLopProgress(optionalStation.get());
                return lopRepository.findTopByOrderByIdDesc();
            }
        }
        return null;
    }

    public void deleteLop(Long lopId) {
        Optional<Lop> optionalLop = lopRepository.findById(lopId);
        optionalLop.ifPresent(lopRepository::delete);
    }

    @Transactional
    public Lop updateLop(Lop lop) {
        Optional<Lop> optionalLop = lopRepository.findLopById(lop.getId());
        if(optionalLop.isEmpty()){
            log.error("LOP with id "+ lop.getId() + " does not exist in database");
        } else {
            Lop saveLop = optionalLop.get();
            saveLop.setStartDate(lop.getStartDate());
            saveLop.setIssuer(lop.getIssuer());
            saveLop.setTransmissionType(lop.getTransmissionType());
            saveLop.setItem(lop.getItem());
            saveLop.setAddition(lop.getAddition());
            saveLop.setEndDate(lop.getEndDate());
            saveLop.setStatus(lop.getStatus(), userService.getLoggedUser());
            User user = userService.getLoggedUser();

            stationService.updateStationLopProgress(stationRepository.getStationByLopId(lop.getId()));

            historyService.newEntryAuto(
                    user,
                    saveLop.getStation().getId(),
                    "Status von LOP: '" + saveLop.getItem() + "' von '" + saveLop.getStation().getName() + "' geändert auf: " + saveLop.getStatus());
            return saveLop;
        }
        return null;
    }
}