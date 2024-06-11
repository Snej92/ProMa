package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.History;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.repository.HistoryRepository;
import org.sysprotec.restapi.repository.StationRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final StationRepository stationRepository;


    public History newEntry(User user, Integer StationId){
        if (stationRepository.findById(StationId).isPresent()){
            Station station = stationRepository.findById(StationId).get();
            History history = History.builder()
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .item("")
                    .userAcronym("")
                    .filename("")
                    .station(station)
                    .build();
            historyRepository.save(history);
            return historyRepository.findTopByOrderByIdDesc();
        }
        return null;
    }
}
