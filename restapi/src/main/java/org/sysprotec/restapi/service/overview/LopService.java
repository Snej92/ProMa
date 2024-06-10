package org.sysprotec.restapi.service.overview;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.repository.LopRepository;
import org.sysprotec.restapi.repository.StationRepository;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class LopService {

    private final StationRepository stationRepository;
    private final LopRepository lopRepository;

    public List<Lop> getStationLop(Integer stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getLop() != null) {
                return optionalStation.get().getLop();
            }
        }
        return null;
    }

    @Transactional
    public void updateLop(Lop lop) {
        Optional<Lop> optionalLop = lopRepository.findLopById(lop.getId());
        if(optionalLop.isEmpty()){
            log.error("LOP with id "+ lop.getId() + " does not exist in database");
        } else {
            Lop saveLop = optionalLop.get();
            saveLop.setItem(lop.getItem());
            saveLop.setEndDate(lop.getEndDate());
            saveLop.setStatus(lop.getStatus());
            saveLop.setUserAcronym(lop.getUserAcronym());
            saveLop.setStartDate(lop.getStartDate());
        }
    }
}