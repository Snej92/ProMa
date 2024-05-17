package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.projections.StationView;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StationService {
    private final StationRepository stationRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public List<StationView> getAllStations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<StationView> stationViews = new ArrayList<>();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                if(projectRepository.findProjectById(user.getActiveProject()).isPresent()){
                    List<Station> station = projectRepository.findProjectById(user.getActiveProject()).get().getStations();
                    if(station != null){
                        for(Station s : station){
                            stationViews.add(stationRepository.getProjectedById(s.getId()));
                        }
                        return stationViews;
                    }
                }
            }
        }
        return stationViews;
    }
}
