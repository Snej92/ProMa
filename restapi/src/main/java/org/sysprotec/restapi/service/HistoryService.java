package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.History;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.repository.HistoryRepository;
import org.sysprotec.restapi.repository.StationRepository;

import java.time.ZonedDateTime;
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


    public void newEntryAuto(Long StationId, String item){
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            if (stationRepository.findById(StationId).isPresent()){
                Station station = stationRepository.findById(StationId).get();
                History newHistory = History.builder()
                        .date(ZonedDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")))
                        .item(item)
                        .userAcronym(loggedUser.getAcronym())
                        .filename("")
                        .station(station)
                        .fileTransfer(false)
                        .transferType(0)
                        .eplan(false)
                        .eplanCopy(false)
                        .build();
                if(!newHistory.getItem().isBlank()){
                    historyRepository.save(newHistory);
                    log.info("New history saved");
                } else {
                    log.warn("New history not saved cause item was blank");
                }
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
                    .date(ZonedDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")))
                    .item(history.getItem())
                    .userAcronym(user.getAcronym())
                    .filename(history.getFilename())
                    .station(optionalStation.get())
                    .fileTransfer(history.getFileTransfer())
                    .transferType(history.getTransferType())
                    .eplan(history.getEplan())
                    .eplanCopy(history.getEplanCopy())

                    .updated(false)
                    .updateDate("")
                    .updateItem("")
                    .updateUserAcronym("")
                    .updateFilename("")
                    .updateFileTransfer(false)
                    .updateTransferType(0)
                    .updateEplan(false)
                    .updateEplanCopy(false)
                    .build();
            historyRepository.save(newHistory);

            if(newHistory.getEplan() && newHistory.getFileTransfer()){
                if(newHistory.getTransferType() == 1 && !newHistory.getEplanCopy()){
                    optionalStation.get().setStatus(StatusEPLAN.EINGELAGERT);
                } else if(newHistory.getTransferType() == 2 && !newHistory.getEplanCopy()){
                    optionalStation.get().setStatus(StatusEPLAN.AUSGELAGERT);
                }
                stationRepository.save(optionalStation.get());
            }

            return historyRepository.findTopByOrderByIdDesc();
        }
        return null;
    }


    @Transactional
    public History updateHistory(History history) {
        Optional<History> optionalHistory = historyRepository.findById(history.getId());
        User user = userService.getLoggedUser();
        if(optionalHistory.isPresent()){

            History updateHistory = optionalHistory.get();

            updateHistory.setUpdated(true);
            updateHistory.setUpdateDate(ZonedDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")));
            updateHistory.setUpdateItem(history.getItem());
            updateHistory.setUpdateUserAcronym(user.getAcronym());
            updateHistory.setUpdateFilename(history.getFilename());
            updateHistory.setUpdateFileTransfer(history.getFileTransfer());
            updateHistory.setUpdateTransferType(history.getTransferType());
            updateHistory.setUpdateEplan(history.getEplan());
            updateHistory.setUpdateEplanCopy(history.getEplanCopy());


            Optional<Station> optionalStation = stationRepository.findById(optionalHistory.get().getStation().getId());
            if(optionalStation.isPresent()){
                if(updateHistory.getUpdateEplan() && updateHistory.getUpdateFileTransfer()){
                    if(updateHistory.getUpdateTransferType() == 1 && !updateHistory.getUpdateEplanCopy()){
                        optionalStation.get().setStatus(StatusEPLAN.EINGELAGERT);
                    } else if(updateHistory.getUpdateTransferType() == 2 && !updateHistory.getUpdateEplanCopy()){
                        optionalStation.get().setStatus(StatusEPLAN.AUSGELAGERT);
                    }
                }
            }
            historyRepository.save(updateHistory);
            if(historyRepository.findById(history.getId()).isPresent()){
                return historyRepository.findById(history.getId()).get();
            }
        }
        return null;
    }
}
