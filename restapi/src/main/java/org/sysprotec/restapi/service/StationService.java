package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.overview.HeaderData;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.overview.TechnicalData;
import org.sysprotec.restapi.model.project.Project;
import org.sysprotec.restapi.model.project.ProjectFavorite;
import org.sysprotec.restapi.model.projections.*;
import org.sysprotec.restapi.model.search.filter.StationFilter;
import org.sysprotec.restapi.model.settings.*;
import org.sysprotec.restapi.model.types.StatusLOP;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationFavoriteRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.overview.HeaderDataRepository;
import org.sysprotec.restapi.repository.overview.TechnicalDataRepository;
import org.sysprotec.restapi.repository.settings.VersionRepository;
import org.sysprotec.restapi.repository.overview.TaskRepository;
import org.sysprotec.restapi.repository.settings.VersionStationRepository;
import org.sysprotec.restapi.service.overview.HeaderDataService;
import org.sysprotec.restapi.service.overview.TechnicalDataService;
import org.sysprotec.restapi.specification.StationSpecification;

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
    private final VersionRepository versionRepository;
    private final TaskRepository taskRepository;
    private final LogService logService;
    private final HeaderDataService headerDataService;
    private final TechnicalDataService technicalDataService;
    private final ProjectService projectService;
    private final VersionStationRepository versionStationRepository;
    private final TechnicalDataRepository technicalDataRepository;
    private final HeaderDataRepository headerDataRepository;
    private final UserService userService;
    private final StationFavoriteRepository stationFavoriteRepository;


    public List<StationFavView> getAllStations() {
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            if(stationRepository.getProjectedByProjectIdOrderByNameAsc(loggedUser.getActiveProject()).isPresent()){

                //Fetch Stations
                List<StationView> stationViews = stationRepository.getProjectedByProjectIdOrderByNameAsc(loggedUser.getActiveProject()).get();

                //create empty Station Favorite List (basically the same as stationViews but with isFavorite)
                List<StationFavView> stationFavViewList = new ArrayList<>();

                for(StationView stationView : stationViews){
                    //check if favorite
                    Optional<StationFavorite> stationFavorite = stationFavoriteRepository.findByUserIdAndStationId(loggedUser.getId(), stationView.getId());
                    boolean favorite = stationFavorite.isPresent();

                    StationFavView stationFavView = StationFavView.builder()
                            .station(stationView)
                            .isFavorite(favorite)
                            .build();

                    stationFavViewList.add(stationFavView);
                }

                return stationFavViewList;
            }
        }
        return null;
    }

    public List<Station> getStationOverallView() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                if(stationRepository.getByProjectIdOrderByNameAsc(user.getActiveProject()).isPresent()){
                    List<Station> stationList = stationRepository.getByProjectIdOrderByNameAsc(user.getActiveProject()).get();

                    //Sort everything
                    for(Station station : stationList){
                        //Header Data
                        List<HeaderData> headerDataList = headerDataRepository.findAllByStationIdOrderByIdAsc(station.getId());
                        station.setHeaderData(headerDataList);

                        //Projection
                        List<Task> projectionList = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("projection", station.getId());
                        station.setProjection(projectionList);

                        //Specification
                        List<Task> specificationList = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("specification", station.getId());
                        station.setSpecification(specificationList);

                        //Documentation
                        List<Task> documentationList = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("doku", station.getId());
                        station.setDocumentation(documentationList);

                        //Control
                        List<Task> controlList = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("control", station.getId());
                        station.setControl(controlList);

                        //Technical Data
                        List<TechnicalData> technicalDataList = technicalDataRepository.findAllByStationIdOrderByIdAsc(station.getId());
                        station.setTechnicalData(technicalDataList);

                    }

                    return stationList;
                }
            }
        }
        return null;
    }

    public List<Station> getStationOverallViewFiltered(StationFilter stationFilter) {
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){

            //Sort direction
            Sort.Direction sortDirection = Sort.Direction.ASC;

            //Sort object
            Sort sort = Sort.by(sortDirection, "name");

            List<Station> stationList = stationRepository.findAll(StationSpecification.filterByNameAndIssuerNameAndStatusAndVersionContaining(
                    stationFilter.getName(), stationFilter.getIssuerName(), stationFilter.getStatus(), stationFilter.getVersion(), loggedUser.getActiveProject(),
                    stationFilter.getMinTotalProgress(), stationFilter.getMaxTotalProgress(), stationFilter.getMinLopProgress(), stationFilter.getMaxLopProgress()
            ), sort);

            //Sort everything
            for(Station station : stationList){
                //Header Data
                List<HeaderData> headerDataList = headerDataRepository.findAllByStationIdOrderByIdAsc(station.getId());
                station.setHeaderData(headerDataList);

                //Projection
                List<Task> projectionList = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("projection", station.getId());
                station.setProjection(projectionList);

                //Specification
                List<Task> specificationList = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("specification", station.getId());
                station.setSpecification(specificationList);

                //Documentation
                List<Task> documentationList = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("doku", station.getId());
                station.setDocumentation(documentationList);

                //Control
                List<Task> controlList = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("control", station.getId());
                station.setControl(controlList);

                //Technical Data
                List<TechnicalData> technicalDataList = technicalDataRepository.findAllByStationIdOrderByIdAsc(station.getId());
                station.setTechnicalData(technicalDataList);

            }

            return stationList;
        }
        return null;
    }


    public StationFavView addStation(StationFavView stationFavView, List<HeaderDataInput> headerDataInput) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                String username = authentication.getName();
                User user = userRepository.findUserByUsernameIgnoreCase(username);
                if (user != null) {
                    Optional<Station> station = stationRepository.findStationByNameIgnoreCaseAndProjectId(stationFavView.getStation().getName(), user.getActiveProject());
                    if(station.isEmpty()){
                        Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                        if (optionalProject.isPresent()) {
                            Project savedProject = optionalProject.get();
                            Station newStation = Station.builder()
                                    .name(stationFavView.getStation().getName())
                                    .description(stationFavView.getStation().getDescription())
                                    .issuerAcronym(stationFavView.getStation().getIssuerAcronym())
                                    .issuerName(stationFavView.getStation().getIssuerName())
                                    .status(stationFavView.getStation().getStatus())
                                    .totalProgress(stationFavView.getStation().getTotalProgress())
                                    .version(stationFavView.getStation().getVersion())
                                    .lopTotal(stationFavView.getStation().getLopTotal())
                                    .lopDone(stationFavView.getStation().getLopDone())
                                    .lopToDo(stationFavView.getStation().getLopToDo())
                                    .lopProgress(stationFavView.getStation().getLopProgress())
                                    .documentationTotal(stationFavView.getStation().getDocumentationTotal())
                                    .documentationDone(stationFavView.getStation().getDocumentationDone())
                                    .documentationToDo(stationFavView.getStation().getDocumentationToDo())
                                    .documentationProgress(stationFavView.getStation().getDocumentationProgress())
                                    .specificationTotal(stationFavView.getStation().getSpecificationTotal())
                                    .specificationDone(stationFavView.getStation().getSpecificationDone())
                                    .specificationToDo(stationFavView.getStation().getSpecificationToDo())
                                    .specificationProgress(stationFavView.getStation().getSpecificationProgress())
                                    .controlTotal(stationFavView.getStation().getControlTotal())
                                    .controlDone(stationFavView.getStation().getControlDone())
                                    .controlToDo(stationFavView.getStation().getControlToDo())
                                    .controlProgress(stationFavView.getStation().getControlProgress())
                                    .projectionTotal(stationFavView.getStation().getProjectionTotal())
                                    .projectionDone(stationFavView.getStation().getProjectionDone())
                                    .projectionToDo(stationFavView.getStation().getProjectionToDo())
                                    .projectionProgress(stationFavView.getStation().getProjectionProgress())
                                    .project(savedProject)
                                    .build();

                            //Issuer Name
                            if(stationFavView.getStation().getIssuerName().equals("Select Eingabe")){
                                Optional<User> optionalUser = userRepository.findUserByAcronym(stationFavView.getStation().getIssuerAcronym());
                                optionalUser.ifPresent(value -> newStation.setIssuerName(value.getFirstname() + " " + value.getLastname()));
                            }

                            //add new Station to Project
                            savedProject.addStation(newStation);

                            //Add new Station to Version
                            List<Version> versionList = versionRepository.findVersionsByProjectIdOrderByIdAsc(savedProject.getId());
                            for(Version version: versionList){
                                int state = 1;
                                boolean done = false;
                                if(version.getVersion().equals("1.0")){
                                    state = 2;
                                    done = true;
                                }
                                VersionStation newVersionStation = VersionStation.builder()
                                        .state(state)
                                        .stationName(stationFavView.getStation().getName())
                                        .version(version)
                                        .build();
                                version.addVersionStation(newVersionStation);
                                version.setDone(done);
                                versionRepository.save(version);
                                log.info("Version '" + version.getVersion() + "' added to Station '" + stationFavView.getStation().getName() + "'");
                            }

                            //Add Header to Station
                            List<HeaderDataSetting> headerDataSettingList = savedProject.getHeaderDataSetting();
                            if(headerDataSettingList != null){
                                for(HeaderDataSetting headerDataSetting: headerDataSettingList){
                                    String data = "";
                                    for(HeaderDataInput headerDataInputList : headerDataInput){
                                        if(headerDataInputList.getItem().equals(headerDataSetting.getItem())){
                                            data = headerDataInputList.getData();
                                        }
                                    }
                                    headerDataService.createHeaderDataForStations(headerDataSetting, data);
                                }
                            }

                            //Add Projection to Station
                            List<TaskSetting> projectionSettingList = savedProject.getProjectionSetting();
                            if(projectionSettingList != null){
                                for(TaskSetting projectionSetting : projectionSettingList){
                                    createProjectionForStations(projectionSetting);
                                }
                            }

                            //Add Specification to Station
                            List<TaskSetting> specificationSettingList = savedProject.getSpecificationSetting();
                            if(specificationSettingList != null){
                                for(TaskSetting specificationSetting : specificationSettingList){
                                    createSpecificationForStations(specificationSetting);
                                }
                            }

                            //Add Technical Data to Station
                            List<TechnicalDataSetting> technicalDataSettingList = savedProject.getTechnicalDataSetting();
                            if(technicalDataSettingList != null){
                                for(TechnicalDataSetting technicalData : technicalDataSettingList){
                                    technicalDataService.createTechnicalDataForStations(technicalData);
                                }
                            }

                            //Add Control to Station
                            List<TaskSetting> controlSettingList = savedProject.getControlSetting();
                            if(controlSettingList != null){
                                for(TaskSetting controlSetting : controlSettingList){
                                    createControlForStations(controlSetting);
                                }
                            }

                            //Add Documentation to Station
                            List<TaskSetting> documentationSettingList = savedProject.getDocumentationSetting();
                            if(documentationSettingList != null){
                                for(TaskSetting documentationSetting : documentationSettingList){
                                    createDocumentationForStations(documentationSetting);
                                }
                            }

                            projectRepository.save(savedProject);
                            log.info("Station '" + stationFavView.getStation().getName() + "' added to Project '" + savedProject.getName() + "'");

                            projectService.updateStationAmount(projectRepository.findProjectById(user.getActiveProject()).get());

                            updateStationDocumentationProgress(newStation);
                            updateStationControlProgress(newStation);
                            updateStationProjectionProgress(newStation);
                            updateStationSpecificationProgress(newStation);
                            updateStationLopProgress(newStation);

                            updateTotalProgress(newStation);

                            return StationFavView.builder()
                                    .station(stationRepository.getProjectedByNameIgnoreCaseAndProjectId(newStation.getName(), savedProject.getId()))
                                    .isFavorite(false)
                                    .build();
                        } else{
                            log.error("Station with name '{}' already exists in Database", stationFavView.getStation().getName());
                        }
                    }
                }
            }
        return null;
    }

    public void deleteStation(Long stationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                if (optionalProject.isPresent()) {
                    Project savedProject = optionalProject.get();
                    savedProject.removeStation(stationId);
                    Station station = stationRepository.findById(stationId).get();
                    List<VersionStation> versionStation = versionStationRepository.findVersionStationsByStationNameOrderByIdAsc(station.getName());
                    versionStationRepository.deleteAll(versionStation);
                    stationRepository.deleteById(stationId);

                    //update amount stations
                    projectService.updateStationAmount(projectRepository.findProjectById(user.getActiveProject()).get());
                }
            }
        }
    }

    public StationFavView updateStation(StationFavView stationFavView) {
        Optional<Station> optionalStation = stationRepository.findById(stationFavView.getStation().getId());
        if (optionalStation.isPresent()) {
            Optional<Station> station = stationRepository.findStationByNameIgnoreCaseAndProjectId(stationFavView.getStation().getName(), optionalStation.get().getProject().getId());
            if(station.isEmpty() || stationFavView.getStation().getName().equals(optionalStation.get().getName())){
                Station saveStation = optionalStation.get();
                saveStation.setName(stationFavView.getStation().getName());
                saveStation.setDescription(stationFavView.getStation().getDescription());
                saveStation.setIssuerAcronym(stationFavView.getStation().getIssuerAcronym());
                saveStation.setIssuerName(stationFavView.getStation().getIssuerName());
                saveStation.setStatus(stationFavView.getStation().getStatus());
                saveStation.setTotalProgress(stationFavView.getStation().getTotalProgress());
                saveStation.setVersion(stationFavView.getStation().getVersion());
                saveStation.setImage(stationFavView.getStation().getImage());
                saveStation.setLopTotal(stationFavView.getStation().getLopTotal());
                saveStation.setLopDone(stationFavView.getStation().getLopDone());
                saveStation.setLopToDo(stationFavView.getStation().getLopToDo());
                saveStation.setLopProgress(stationFavView.getStation().getLopProgress());
                saveStation.setDocumentationTotal(stationFavView.getStation().getDocumentationTotal());
                saveStation.setDocumentationDone(stationFavView.getStation().getDocumentationDone());
                saveStation.setDocumentationToDo(stationFavView.getStation().getDocumentationToDo());
                saveStation.setDocumentationProgress(stationFavView.getStation().getDocumentationProgress());
                saveStation.setSpecificationTotal(stationFavView.getStation().getSpecificationTotal());
                saveStation.setSpecificationDone(stationFavView.getStation().getSpecificationDone());
                saveStation.setSpecificationToDo(stationFavView.getStation().getSpecificationToDo());
                saveStation.setSpecificationProgress(stationFavView.getStation().getSpecificationProgress());
                saveStation.setControlTotal(stationFavView.getStation().getControlTotal());
                saveStation.setControlDone(stationFavView.getStation().getControlDone());
                saveStation.setControlToDo(stationFavView.getStation().getControlToDo());
                saveStation.setControlProgress(stationFavView.getStation().getControlProgress());

                //Issuer Name
                Optional<User> optionalUser = userRepository.findUserByAcronym(stationFavView.getStation().getIssuerAcronym());
                optionalUser.ifPresent(value -> saveStation.setIssuerName(value.getFirstname() + " " + value.getLastname()));

                stationRepository.save(saveStation);

                //update amount stations
                projectService.updateStationAmount(projectRepository.findProjectByStationsId(stationFavView.getStation().getId()));

                return StationFavView.builder()
                        .station(stationRepository.getProjectedById(stationFavView.getStation().getId()))
                        .isFavorite(stationFavView.getIsFavorite())
                        .build();

            } else {
                log.error("Station {} already exists in Database", stationFavView.getStation().getName());
            }
        } else {
            log.error("Station with ID{} does not exist", stationFavView.getStation().getId());
        }
        return null;
    }

    public StationFavView getStation(Long stationId) {
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null) {
            Boolean isFavorite = stationFavoriteRepository.findByUserIdAndStationId(loggedUser.getId(), stationId).isPresent();
            return StationFavView.builder()
                    .station(stationRepository.getProjectedById(stationId))
                    .isFavorite(isFavorite)
                    .build();
        }
        return null;
    }

    public void editFavorite(Long stationId, Boolean remove) {
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            if(!remove){
                if(stationRepository.findById(stationId).isPresent()
                        && stationFavoriteRepository.findByUserIdAndStationId(loggedUser.getId(), stationId).isEmpty()){
                    StationFavorite stationFavorite = StationFavorite.builder()
                            .userId(loggedUser.getId())
                            .stationId(stationId)
                            .build();
                    loggedUser.addStationFavorite(stationFavorite);
                    userRepository.save(loggedUser);
                    log.info("station with id {} favored by {}", stationId, loggedUser.getUsername());
                } else {
                    log.error("station with id {} does not exist or is already favored by {}", stationId, loggedUser.getUsername());
                }
            } else {
                Optional<StationFavorite> optionalStationFavorite = stationFavoriteRepository.findByUserIdAndStationId(loggedUser.getId(), stationId);
                if(optionalStationFavorite.isPresent()){
                    loggedUser.removeStationFavorite(optionalStationFavorite.get().getId());
                    stationFavoriteRepository.delete(optionalStationFavorite.get());
                    log.info("station with id {} removed as favorite by {}", stationId, loggedUser.getUsername());
                } else {
                    log.error("station with id {} is not favored by {}", stationId, loggedUser.getUsername());
                }
            }
        } else {
            log.error("No User logged in");
        }
    }

    public List<StationFavView> getFavorites(){
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            List<StationFavorite> stationFavorite = loggedUser.getStationFavorite();
            List<StationFavView> stationFavViews = new ArrayList<>();
            if(stationFavorite != null && !stationFavorite.isEmpty()){
                for(StationFavorite stationFavoriteItem : stationFavorite){
                    StationView station = stationRepository.getProjectedById(stationFavoriteItem.getStationId());
                    if(station != null ){
                        if(stationRepository.getStationByIdAndProjectId(station.getId(), loggedUser.getActiveProject()).isPresent()){
                            StationFavView stationFavView = StationFavView.builder()
                                    .station(station)
                                    .isFavorite(true)
                                    .build();
                            stationFavViews.add(stationFavView);
                        }
                    }
                }
            }
            return stationFavViews;
        }
        return null;
    }

    public List<StationFavView> getAssignedStation(){
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            Optional<List<StationView>> optionalStationViews = stationRepository.getProjectedByIssuerNameAndProjectId(
                    loggedUser.getFirstname() + " " + loggedUser.getLastname(), loggedUser.getActiveProject());
            List<StationFavView> stationFavViews = new ArrayList<>();
            if(optionalStationViews.isPresent()){
                for(StationView stationView : optionalStationViews.get()){
                    Optional<StationFavorite> optionalStationFavorite = stationFavoriteRepository.findByUserIdAndStationId(
                            loggedUser.getId(), stationView.getId());
                    if(optionalStationFavorite.isPresent()){
                        StationFavView stationFavView = StationFavView.builder()
                                .station(stationView)
                                .isFavorite(true)
                                .build();
                        stationFavViews.add(stationFavView);
                    } else {
                        StationFavView stationFavView = StationFavView.builder()
                                .station(stationView)
                                .isFavorite(false)
                                .build();
                        stationFavViews.add(stationFavView);
                    }
                }
            }
            return stationFavViews;
        }
        return null;
    }

    //#######################Additional Functions##############################


    public void updateStationVersion(){
        ProjectFavView activeProject = projectService.getActiveProject();
        List<Station> stationList = stationRepository.getStationsByProjectId(activeProject.getProject().getId());
        for(Station station : stationList){
            boolean versionOK = true;
            List<VersionStation> versionStationList = versionStationRepository.findVersionStationsByStationNameOrderByIdAsc(station.getName());
            for(VersionStation versionStation : versionStationList){
                if(versionStation.getState() != 1 && versionOK){
                    station.setVersion(versionStation.getVersion().getVersion());
                    stationRepository.save(station);
                    log.info("set Version '" + versionStation.getVersion().getVersion() +"' to Station '" + station.getName() +"'");
                }else{
                    log.info("Version '" + versionStation.getVersion().getVersion() +"' for Station '" + station.getName() +"' not done");
                    versionOK = false;
                    if(versionStation == versionStationList.getFirst()){
                        station.setVersion("-");
                        stationRepository.save(station);
                        log.info("no Version done for Station " + station.getName() +"'");
                    }
                }
            }
        }
    }

    public void updateAllStationStatus(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                if (optionalProject.isPresent()) {
                    Project savedProject = optionalProject.get();
                    for(Station station : savedProject.getStations()){
                        updateStationDocumentationProgress(station);
                        updateStationControlProgress(station);
                        updateStationProjectionProgress(station);
                        updateStationSpecificationProgress(station);
                        updateStationLopProgress(station);

                        updateTotalProgress(station);

                        stationRepository.save(station);
                    }
                }
            }
        }
    }

    public void updateStationDocumentationProgress(Station station){
        List<Task> documentations = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("doku", station.getId());
        if(documentations != null){
            float done = 0;
            float toDo = 0;
            float progress = 0;
            float total = 0;
            if(!documentations.isEmpty()){
                //Total Documentations
               total = documentations.size();

                //Done Documentations + still to do documentations
                for(Task task: documentations){
                    if(task.getDone()){
                        done += 1;
                    } else {
                        toDo += 1;
                    }
                }

                //Progress
                progress = (done/total)*100;
            } else{
                progress = 100;
            }

            station.setDocumentationTotal((int)total);
            station.setDocumentationProgress((int)progress);
            station.setDocumentationDone((int)done);
            station.setDocumentationToDo((int)toDo);

            logService.SeparatorLog();
            log.info("documentation Total of '{}' set to: {}", station.getName(), station.getDocumentationTotal());
            log.info("documentation Done of '{}' set to: {}", station.getName(), station.getDocumentationDone());
            log.info("documentation ToDo of '{}' set to: {}", station.getName(), station.getDocumentationToDo());
            log.info("documentation Progress of '{}' set to: {}%", station.getName(), station.getDocumentationProgress());

            updateTotalProgress(station);

            stationRepository.save(station);
        }
    }

    public void updateStationControlProgress(Station station){
        List<Task> controls = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("control", station.getId());
        if(controls != null){
            float done = 0;
            float toDo = 0;
            float progress = 0;
            float total = 0;
            if(!controls.isEmpty()){
                //Total controls
                total = controls.size();

                //Done controls + still to do controls
                for(Task task: controls){
                    if(task.getDone()){
                        done += 1;
                    } else {
                        toDo += 1;
                    }
                }

                //Progress
                progress = (done/total)*100;
            } else{
                progress = 100;
            }

            station.setControlTotal((int)total);
            station.setControlProgress((int)progress);
            station.setControlDone((int)done);
            station.setControlToDo((int)toDo);

            logService.SeparatorLog();
            log.info("control Total of '{}' set to: {}", station.getName(), station.getControlTotal());
            log.info("control Done of '{}' set to: {}", station.getName(), station.getControlDone());
            log.info("control ToDo of '{}' set to: {}", station.getName(), station.getControlToDo());
            log.info("control Progress of '{}' set to: {}%", station.getName(), station.getControlProgress());

            updateTotalProgress(station);

            stationRepository.save(station);
        }
    }

    public void updateStationSpecificationProgress(Station station){
        List<Task> specifications = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("specification", station.getId());
        if(specifications != null){
            float done = 0;
            float toDo = 0;
            float progress = 0;
            float total = 0;
            if(!specifications.isEmpty()){
                //Total specifications
                total = specifications.size();

                //Done specifications + still to do specifications
                for(Task task: specifications){
                    if(task.getDone()){
                        done += 1;
                    } else {
                        toDo += 1;
                    }
                }

                //Progress
                progress = (done/total)*100;
            } else{
                progress = 100;
            }

            station.setSpecificationTotal((int)total);
            station.setSpecificationProgress((int)progress);
            station.setSpecificationDone((int)done);
            station.setSpecificationToDo((int)toDo);

            logService.SeparatorLog();
            log.info("specification Total of '{}' set to: {}", station.getName(), station.getSpecificationTotal());
            log.info("specification Done of '{}' set to: {}", station.getName(), station.getSpecificationDone());
            log.info("specification ToDo of '{}' set to: {}", station.getName(), station.getSpecificationToDo());
            log.info("specification Progress of '{}' set to: {}%", station.getName(), station.getSpecificationProgress());

            updateTotalProgress(station);

            stationRepository.save(station);
        }
    }

    public void updateStationProjectionProgress(Station station){
        List<Task> projections = taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("projection", station.getId());
        if(projections != null){
            float done = 0;
            float toDo = 0;
            float progress = 0;
            float total = 0;
            if(!projections.isEmpty()){
                //Total projections
                total = projections.size();

                //Done projections + still to do projections
                for(Task task: projections){
                    if(task.getDone()){
                        done += 1;
                    } else {
                        toDo += 1;
                    }
                }

                //Progress
                progress = (done/total)*100;
            } else{
                progress = 100;
            }

            station.setProjectionTotal((int)total);
            station.setProjectionProgress((int)progress);
            station.setProjectionDone((int)done);
            station.setProjectionToDo((int)toDo);

            logService.SeparatorLog();
            log.info("projection Total of '{}' set to: {}", station.getName(), station.getProjectionTotal());
            log.info("projection Done of '{}' set to: {}", station.getName(), station.getProjectionDone());
            log.info("projection ToDo of '{}' set to: {}", station.getName(), station.getProjectionToDo());
            log.info("projection Progress of '{}' set to: {}%", station.getName(), station.getProjectionProgress());

            updateTotalProgress(station);

            stationRepository.save(station);
        }
    }

    public void updateStationLopProgress(Station station){
        List<Lop> lops = station.getLop();
        float done = 0;
        float toDo = 0;
        float progress = 0;
        float total = 0;
        if(lops != null){
            if(!lops.isEmpty()){
                log.info("LOP is not empty");
                //Total Lops
                total = lops.size();

                //Done lops + still to do lops
                for(Lop lop : lops){
                    if(lop.getStatus() == StatusLOP.ERLEDIGT){
                        done += 1;
                    } else {
                        toDo += 1;
                    }
                }

                //Progress
                progress = (done/total)*100;
            } else{
                log.info("LOP is empty");
                progress = 100;
            }

            station.setLopTotal((int)total);
            station.setLopProgress((int)progress);
            station.setLopDone((int)done);
            station.setLopToDo((int)toDo);

            logService.SeparatorLog();
            log.info("lop Total of '{}' set to: {}", station.getName(), station.getLopTotal());
            log.info("lop Done of '{}' set to: {}", station.getName(), station.getLopDone());
            log.info("lop ToDo of '{}' set to: {}", station.getName(), station.getLopToDo());
            log.info("lop Progress of '{}' set to: {}%", station.getName(), station.getLopProgress());

            updateTotalProgress(station);
            
            stationRepository.save(station);
        } else {
            station.setLopTotal(0);
            station.setLopProgress(100);
            station.setLopDone(0);
            station.setLopToDo(0);

            logService.SeparatorLog();
            log.info("lop Total of '{}' set to: 0", station.getName());
            log.info("lop Done of '{}' set to: 0", station.getName());
            log.info("lop ToDo of '{}' set to: 0", station.getName());
            log.info("lop Progress of '{}' set to: 100%", station.getName());

            updateTotalProgress(station);

            stationRepository.save(station);
        }
    }

    public void updateTotalProgress(Station station){
        station.setTotalProgress(
                (station.getDocumentationProgress()
                        +station.getControlProgress()
                        +station.getProjectionProgress()
                        +station.getSpecificationProgress()
                        +station.getLopProgress())
                        /5
        );
    }

    public void createControlForStations(TaskSetting taskSetting) {
        Optional<Project> optionalProject = projectRepository.findProjectById(taskSetting.getProject().getId());
        if(optionalProject.isPresent()) {
            List<Station> stationList = optionalProject.get().getStations();
            for(Station station : stationList) {
                if (stationRepository.findStationByNameAndControlTaskSettingId(station.getName(), taskSetting.getId()).isEmpty()) {
                    Task task = Task.builder()
                            .taskSetting(taskSetting)
                            .dateDone("")
                            .dateCommited("")
                            .addition("")
                            .done(false)
                            .commited(false)
                            .issuerAcronym("")
                            .issuerName("")
                            .station(station)
                            .build();
                    taskRepository.save(task);
                    updateStationControlProgress(station);
                    log.info("Added Control Task '" + task.getTaskSetting().getItem() + "' to station '" + station.getName() + "'");
                }
            }
        }
    }

    public void createDocumentationForStations(TaskSetting taskSetting) {
        if(taskSetting != null){
            Optional<Project> optionalProject = projectRepository.findProjectById(taskSetting.getProject().getId());
            if(optionalProject.isPresent()) {
                List<Station> stationList = optionalProject.get().getStations();
                for(Station station : stationList) {
                    if (stationRepository.findStationByNameAndDocumentationTaskSettingId(station.getName(), taskSetting.getId()).isEmpty()) {
                        Task task = Task.builder()
                                .taskSetting(taskSetting)
                                .dateDone("")
                                .dateCommited("")
                                .addition("")
                                .done(false)
                                .commited(false)
                                .issuerAcronym("")
                                .issuerName("")
                                .station(station)
                                .build();
                        taskRepository.save(task);
                        updateStationDocumentationProgress(station);
                        log.info("Added Documentation Task '" + task.getTaskSetting().getItem() + "' to station '" + station.getName() + "'");
                    }
                }
            }
        }
    }

    public void createProjectionForStations(TaskSetting taskSetting) {
        Optional<Project> optionalProject = projectRepository.findProjectById(taskSetting.getProject().getId());
        if(optionalProject.isPresent()) {
            List<Station> stationList = optionalProject.get().getStations();
            for(Station station : stationList) {
                if (stationRepository.findStationByNameAndProjectionTaskSettingId(station.getName(), taskSetting.getId()).isEmpty()) {
                    Task task = Task.builder()
                            .taskSetting(taskSetting)
                            .dateDone("")
                            .dateCommited("")
                            .addition("")
                            .done(false)
                            .commited(false)
                            .issuerAcronym("")
                            .issuerName("")
                            .station(station)
                            .build();
                    taskRepository.save(task);
                    updateStationProjectionProgress(station);
                    log.info("Added Projection Task '" + task.getTaskSetting().getItem() + "' to station '" + station.getName() + "'");
                }
            }
        }
    }

    public void createSpecificationForStations(TaskSetting taskSetting) {
        Optional<Project> optionalProject = projectRepository.findProjectById(taskSetting.getProject().getId());
        if(optionalProject.isPresent()) {
            List<Station> stationList = optionalProject.get().getStations();
            for(Station station : stationList) {
                if (stationRepository.findStationByNameAndSpecificationTaskSettingId(station.getName(), taskSetting.getId()).isEmpty()) {
                    Task task = Task.builder()
                            .taskSetting(taskSetting)
                            .dateDone("")
                            .dateCommited("")
                            .addition("")
                            .done(false)
                            .commited(false)
                            .issuerAcronym("")
                            .issuerName("")
                            .station(station)
                            .build();
                    taskRepository.save(task);
                    updateStationSpecificationProgress(station);
                    log.info("Added Specification Task '" + task.getTaskSetting().getItem() + "' to station '" + station.getName() + "'");
                }
            }
        }
    }

}