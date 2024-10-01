package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.projections.StationFavView;
import org.sysprotec.restapi.model.projections.StationRequest;
import org.sysprotec.restapi.model.search.filter.StationFilter;
import org.sysprotec.restapi.service.StationService;

import java.util.List;

@RestController
@RequestMapping("/api/station")
@RequiredArgsConstructor
public class StationController {

    private final StationService stationService;

    //todo: add ResponseEntity
    @GetMapping("/all")
    public List<StationFavView> getAllStations(){
        return stationService.getAllStations();
    }

    @GetMapping("/overall")
    public List<Station> getStationOverallView(){
        return stationService.getStationOverallView();
    }

    @PostMapping("/overall")
    public List<Station> getStationOverallViewFiltered(@RequestBody StationFilter stationFilter){
        return stationService.getStationOverallViewFiltered(stationFilter);
    }

    @GetMapping("{stationId}")
    public StationFavView getStation(@PathVariable Long stationId){
        return stationService.getStation(stationId);
    }

    @PostMapping
    public StationFavView addStation(@RequestBody StationRequest stationRequest){
        return stationService.addStation(stationRequest.getStationFavView(), stationRequest.getHeaderDataInput());
    }

    @PutMapping
    public StationFavView updateStation(@RequestBody StationFavView stationFavView){
        return stationService.updateStation(stationFavView);
    }

    @DeleteMapping("{stationId}")
    public void deleteStation(@PathVariable Long stationId){
        stationService.deleteStation(stationId);
    }

    @PostMapping("/updateStationStatus")
    public void updateAllStationStatus(){
        stationService.updateAllStationStatus();
    }

    @GetMapping("favorite/{stationId}/{remove}")
    public void editFavorite(@PathVariable Long stationId,
                             @PathVariable Boolean remove){
        stationService.editFavorite(stationId, remove);
    }

    @GetMapping("/favorite")
    public List<StationFavView> getFavorites(){
        return stationService.getFavorites();
    }

    @GetMapping("/assigned")
    public List<StationFavView> getAssignedStations(){
        return stationService.getAssignedStation();
    }
}
