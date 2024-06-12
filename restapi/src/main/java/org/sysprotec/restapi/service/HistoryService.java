package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.History;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
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


    public void newEntryAuto(User user, Integer StationId, String item){
        if (stationRepository.findById(StationId).isPresent()){
            Station station = stationRepository.findById(StationId).get();
            History newHistory = History.builder()
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")))
                    .item(item)
                    .userAcronym(user.getAcronym())
                    .filename("")
                    .station(station)
                    .build();
            historyRepository.save(newHistory);
        }
    }

    public List<History> getHistoryByStationId(Integer stationId){
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getLop() != null) {
                return optionalStation.get().getHistory();
            }
        }
        return null;
    }

    public History addHistory(History history, Integer stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        User user = userService.getLoggedUser();
        if (optionalStation.isPresent()) {
            History newHistory = History.builder()
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")))
                    .item(history.getItem())
                    .userAcronym(user.getAcronym())
                    .filename(history.getFilename())
                    .station(optionalStation.get())
                    .build();
            historyRepository.save(newHistory);
            return historyRepository.findTopByOrderByIdDesc();
        }
        return null;
    }
}
