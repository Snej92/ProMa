package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.projections.StationDto;
import org.sysprotec.restapi.model.projections.StationView;
import org.sysprotec.restapi.model.settings.*;
import org.sysprotec.restapi.model.types.StatusLOP;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.overview.LopRepository;
import org.sysprotec.restapi.repository.settings.VersionRepository;
import org.sysprotec.restapi.repository.overview.TaskRepository;
import org.sysprotec.restapi.service.overview.HeaderDataService;
import org.sysprotec.restapi.service.overview.LopService;
import org.sysprotec.restapi.service.overview.TechnicalDataService;
import org.sysprotec.restapi.service.overview.task.ControlService;
import org.sysprotec.restapi.service.overview.task.DocumentationService;
import org.sysprotec.restapi.service.overview.task.ProjectionService;
import org.sysprotec.restapi.service.overview.task.SpecificationService;

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
    private final ProjectionService projectionService;
    private final SpecificationService specificationService;
    private final TechnicalDataService technicalDataService;
    private final ControlService controlService;
    private final DocumentationService documentationService;
    private final LopService lopService;


    public List<StationView> getAllStations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                if(stationRepository.getProjectedByProjectIdOrderById(user.getActiveProject()).isPresent()){
                    return stationRepository.getProjectedByProjectIdOrderById(user.getActiveProject()).get();
                }
            }
        }
        return null;
    }

    public StationDto addStation(StationDto stationDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                if (optionalProject.isPresent()) {
                    Project savedProject = optionalProject.get();
                    Station newStation = Station.builder()
                            .name(stationDto.getName())
                            .description(stationDto.getDescription())
                            .issuer(stationDto.getIssuer())
                            .status(stationDto.getStatus())
                            .totalProgress(stationDto.getTotalProgress())
                            .version(stationDto.getVersion())
                            .lopTotal(stationDto.getLopTotal())
                            .lopDone(stationDto.getLopDone())
                            .lopToDo(stationDto.getLopToDo())
                            .lopProgress(stationDto.getLopProgress())
                            .documentationTotal(stationDto.getDocumentationTotal())
                            .documentationDone(stationDto.getDocumentationDone())
                            .documentationToDo(stationDto.getDocumentationToDo())
                            .documentationProgress(stationDto.getDocumentationProgress())
                            .specificationTotal(stationDto.getSpecificationTotal())
                            .specificationDone(stationDto.getSpecificationDone())
                            .specificationToDo(stationDto.getSpecificationToDo())
                            .specificationProgress(stationDto.getSpecificationProgress())
                            .controlTotal(stationDto.getControlTotal())
                            .controlDone(stationDto.getControlDone())
                            .controlToDo(stationDto.getControlToDo())
                            .controlProgress(stationDto.getControlProgress())
                            .project(savedProject)
                            .build();
                    savedProject.addStation(newStation);

                    //Add new Station to Version
                    List<Version> versionList = versionRepository.findVersionsByProjectIdOrderByVersionAsc(savedProject.getId());
                    for(Version version: versionList){
                        VersionStation newVersionStation = VersionStation.builder()
                                .done(false)
                                .stationName(stationDto.getName())
                                .version(version)
                                .build();
                        version.addVersionStation(newVersionStation);
                        versionRepository.save(version);
                        log.info("Version '" + version.getVersion() + "' added to Station '" + stationDto.getName() + "'");
                    }

                    //Add Lops to Station
//                    List<LopSetting> lopSettingList = savedProject.getLopSetting();
//                    if (lopSettingList != null) {
//                        for(LopSetting lopSetting: lopSettingList){
//                            lopService.createLopForStations(lopSetting);
//                        }
//                    }
                    //Add Header to Station
                    List<HeaderDataSetting> headerDataSettingList = savedProject.getHeaderDataSetting();
                    if(headerDataSettingList != null){
                        for(HeaderDataSetting headerDataSetting: headerDataSettingList){
                            headerDataService.createHeaderDataForStations(headerDataSetting);
                        }
                    }

                    //Add Projection to Station
                    List<TaskSetting> projectionSettingList = savedProject.getProjectionSetting();
                    if(projectionSettingList != null){
                        for(TaskSetting projectionSetting : projectionSettingList){
                            projectionService.createProjectionForStations(projectionSetting);
                        }
                    }

                    //Add Specification to Station
                    List<TaskSetting> specificationSettingList = savedProject.getSpecificationSetting();
                    if(specificationSettingList != null){
                        for(TaskSetting specificationSetting : specificationSettingList){
                            specificationService.createSpecificationForStations(specificationSetting);
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
                            controlService.createControlForStations(controlSetting);
                        }
                    }

                    //Add Documentation to Station
                    List<TaskSetting> documentationSettingList = savedProject.getDocumentationSetting();
                    if(documentationSettingList != null){
                        for(TaskSetting documentationSetting : documentationSettingList){
                            documentationService.createDocumentationForStations(documentationSetting);
                        }
                    }

                    projectRepository.save(savedProject);
                    log.info("Station '" + stationDto.getName() + "' added to Project '" + savedProject.getName() + "'");
                    return stationRepository.findTopByOrderByIdDesc();
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
                    stationRepository.deleteById(stationId);
                }
            }
        }
    }

    public StationDto updateStation(StationDto stationDto) {
        Optional<Station> optionalStation = stationRepository.findById(stationDto.getId());
        if (optionalStation.isPresent()) {
            Station saveStation = optionalStation.get();
            saveStation.setName(stationDto.getName());
            saveStation.setDescription(stationDto.getDescription());
            saveStation.setIssuer(stationDto.getIssuer());
            saveStation.setStatus(stationDto.getStatus());
            saveStation.setTotalProgress(stationDto.getTotalProgress());
            saveStation.setVersion(stationDto.getVersion());
            saveStation.setLopTotal(stationDto.getLopTotal());
            saveStation.setLopDone(stationDto.getLopDone());
            saveStation.setLopToDo(stationDto.getLopToDo());
            saveStation.setLopProgress(stationDto.getLopProgress());
            saveStation.setDocumentationTotal(stationDto.getDocumentationTotal());
            saveStation.setDocumentationDone(stationDto.getDocumentationDone());
            saveStation.setDocumentationToDo(stationDto.getDocumentationToDo());
            saveStation.setDocumentationProgress(stationDto.getDocumentationProgress());
            saveStation.setSpecificationTotal(stationDto.getSpecificationTotal());
            saveStation.setSpecificationDone(stationDto.getSpecificationDone());
            saveStation.setSpecificationToDo(stationDto.getSpecificationToDo());
            saveStation.setSpecificationProgress(stationDto.getSpecificationProgress());
            saveStation.setControlTotal(stationDto.getControlTotal());
            saveStation.setControlDone(stationDto.getControlDone());
            saveStation.setControlToDo(stationDto.getControlToDo());
            saveStation.setControlProgress(stationDto.getControlProgress());

            stationRepository.save(saveStation);
            return stationRepository.findProjectedById(stationDto.getId());
        } else {
            log.error("Station with ID{} does not exist", stationDto.getId());
            return null;
        }
    }

    public StationView getStation(Long stationId) {
        return stationRepository.getProjectedById(stationId);
    }

    //#######################Additional Functions##############################

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

                        station.setTotalProgress(
                                        (station.getDocumentationProgress()
                                        +station.getControlProgress()
                                        +station.getProjectionProgress()
                                        +station.getSpecificationProgress()
                                        +station.getLopProgress())
                                        /5
                        );

                        stationRepository.save(station);
                    }
                }
            }
        }
    }

    public void updateStationDocumentationProgress(Station station){
        List<Task> documentations = taskRepository.findAllByTaskSettingTypeAndStationId("doku", station.getId());
        if(documentations != null){
            int done = 0;
            int toDo = 0;
            int progress = 0;
            int total = 0;
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

            station.setDocumentationTotal(total);
            station.setDocumentationProgress(progress);
            station.setDocumentationDone(done);
            station.setDocumentationToDo(toDo);

            logService.SeparatorLog();
            log.info("documentation Total of '{}' set to: {}", station.getName(), station.getDocumentationTotal());
            log.info("documentation Done of '{}' set to: {}", station.getName(), station.getDocumentationDone());
            log.info("documentation ToDo of '{}' set to: {}", station.getName(), station.getDocumentationToDo());
            log.info("documentation Progress of '{}' set to: {}%", station.getName(), station.getDocumentationProgress());
            stationRepository.save(station);
        }
    }

    public void updateStationControlProgress(Station station){
        List<Task> controls = taskRepository.findAllByTaskSettingTypeAndStationId("control", station.getId());
        if(controls != null){
            int done = 0;
            int toDo = 0;
            int progress = 0;
            int total = 0;
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

            station.setControlTotal(total);
            station.setControlProgress(progress);
            station.setControlDone(done);
            station.setControlToDo(toDo);

            logService.SeparatorLog();
            log.info("control Total of '{}' set to: {}", station.getName(), station.getControlTotal());
            log.info("control Done of '{}' set to: {}", station.getName(), station.getControlDone());
            log.info("control ToDo of '{}' set to: {}", station.getName(), station.getControlToDo());
            log.info("control Progress of '{}' set to: {}%", station.getName(), station.getControlProgress());
            stationRepository.save(station);
        }
    }

    public void updateStationSpecificationProgress(Station station){
        List<Task> specifications = taskRepository.findAllByTaskSettingTypeAndStationId("specification", station.getId());
        if(specifications != null){
            int done = 0;
            int toDo = 0;
            int progress = 0;
            int total = 0;
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

            station.setSpecificationTotal(total);
            station.setSpecificationProgress(progress);
            station.setSpecificationDone(done);
            station.setSpecificationToDo(toDo);

            logService.SeparatorLog();
            log.info("specification Total of '{}' set to: {}", station.getName(), station.getSpecificationTotal());
            log.info("specification Done of '{}' set to: {}", station.getName(), station.getSpecificationDone());
            log.info("specification ToDo of '{}' set to: {}", station.getName(), station.getSpecificationToDo());
            log.info("specification Progress of '{}' set to: {}%", station.getName(), station.getSpecificationProgress());
            stationRepository.save(station);
        }
    }

    public void updateStationProjectionProgress(Station station){
        List<Task> projections = taskRepository.findAllByTaskSettingTypeAndStationId("projection", station.getId());
        if(projections != null){
            int done = 0;
            int toDo = 0;
            int progress = 0;
            int total = 0;
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

            station.setProjectionTotal(total);
            station.setProjectionProgress(progress);
            station.setProjectionDone(done);
            station.setProjectionToDo(toDo);

            logService.SeparatorLog();
            log.info("projection Total of '{}' set to: {}", station.getName(), station.getProjectionTotal());
            log.info("projection Done of '{}' set to: {}", station.getName(), station.getProjectionDone());
            log.info("projection ToDo of '{}' set to: {}", station.getName(), station.getProjectionToDo());
            log.info("projection Progress of '{}' set to: {}%", station.getName(), station.getProjectionProgress());
            stationRepository.save(station);
        }
    }

    public void updateStationLopProgress(Station station){
        List<Lop> lops = lopService.getStationLop(station.getId());
        if(lops != null){
            int done = 0;
            int toDo = 0;
            int progress = 0;
            int total = 0;
            if(!lops.isEmpty()){
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
                progress = 100;
            }

            station.setLopTotal(total);
            station.setLopProgress(progress);
            station.setLopDone(done);
            station.setLopToDo(toDo);

            logService.SeparatorLog();
            log.info("lop Total of '{}' set to: {}", station.getName(), station.getLopTotal());
            log.info("lop Done of '{}' set to: {}", station.getName(), station.getLopDone());
            log.info("lop ToDo of '{}' set to: {}", station.getName(), station.getLopToDo());
            log.info("lop Progress of '{}' set to: {}%", station.getName(), station.getLopProgress());
            stationRepository.save(station);
        }
    }
}