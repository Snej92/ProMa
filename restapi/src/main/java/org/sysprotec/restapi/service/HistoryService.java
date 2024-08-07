package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.History;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.repository.HistoryRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.UserRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final StationRepository stationRepository;
    private final UserService userService;


    public void newEntryAuto(User user, Long StationId, String item){
        if (stationRepository.findById(StationId).isPresent()){
            Station station = stationRepository.findById(StationId).get();
            History newHistory = History.builder()
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")))
                    .item(item)
                    .userAcronym(user.getAcronym())
                    .filename("")
                    .station(station)
                    .fileTransfer(false)
                    .transferType(0)
                    .eplan(false)
                    .build();
            if(!newHistory.getItem().isBlank()){
                historyRepository.save(newHistory);
                log.info("New history saved");
            } else {
                log.warn("New history not saved cause item was blank");
            }
        }
    }

    public List<History> getHistoryByStationId(Long stationId){
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getLop() != null) {
                return historyRepository.findHistoriesByStationIdOrderByIdDesc(stationId);
            }
        }
        return null;
    }

    public History addHistory(History history, Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        User user = userService.getLoggedUser();
        if (optionalStation.isPresent()) {
            History newHistory = History.builder()
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")))
                    .item(history.getItem())
                    .userAcronym(user.getAcronym())
                    .filename(history.getFilename())
                    .station(optionalStation.get())
                    .fileTransfer(history.getFileTransfer())
                    .transferType(history.getTransferType())
                    .eplan(history.getEplan())
                    .build();
            historyRepository.save(newHistory);

            if(newHistory.getEplan() && newHistory.getFileTransfer()){
                if(newHistory.getTransferType() == 1){
                    optionalStation.get().setStatus(StatusEPLAN.EINGELAGERT);
                } else if(newHistory.getTransferType() == 2){
                    optionalStation.get().setStatus(StatusEPLAN.AUSGELAGERT);
                }
                stationRepository.save(optionalStation.get());
            }

            return historyRepository.findTopByOrderByIdDesc();
        }
        return null;
    }
}
