package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.projections.StationDto;
import org.sysprotec.restapi.model.projections.StationView;
import org.sysprotec.restapi.model.settings.*;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.settings.VersionRepository;
import org.sysprotec.restapi.repository.overview.TaskRepository;
import org.sysprotec.restapi.service.overview.HeaderDataService;
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

    public Station getStation(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        return optionalStation.orElse(null);
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
//                        List<Task> control = taskRepository.findAllByTaskSettingTypeAndStationId("control", stationId);
//                        List<Task> specification = taskRepository.findAllByTaskSettingTypeAndStationId("specification", stationId);
//                        List<Lop> lop = lopService.getStationLop(stationId);

                        updateStationDocumentationProgress(station);
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
                progress = (done/station.getDocumentationTotal())*100;
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
}