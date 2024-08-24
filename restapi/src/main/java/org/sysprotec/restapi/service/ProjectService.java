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
import org.sysprotec.restapi.model.overview.HeaderData;
import org.sysprotec.restapi.model.projections.ProjectDto;
import org.sysprotec.restapi.model.settings.HeaderDataSetting;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.model.settings.TechnicalDataSetting;
import org.sysprotec.restapi.model.settings.Version;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.overview.HeaderDataRepository;
import org.sysprotec.restapi.repository.settings.HeaderDataSettingRepository;
import org.sysprotec.restapi.repository.settings.TaskSettingRepository;
import org.sysprotec.restapi.repository.settings.TechnicalDataSettingRepository;
import org.sysprotec.restapi.repository.settings.VersionRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final VersionRepository versionRepository;
    private final UserService userService;
    private final HeaderDataSettingRepository headerDataSettingRepository;
    private final TaskSettingRepository taskSettingRepository;
    private final TechnicalDataSettingRepository technicalDataSettingRepository;

    public List<Project> getAllProjects(Boolean archive) {
        return projectRepository.findProjectsByArchived(archive);
    }

    public ProjectDto getActiveProject() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            userService.SyncUser();
            if(user!=null){
                if(user.getActiveProject()!=null){
                    if(user.getActiveProject()!=0){
                        if(projectRepository.getProjectedById(user.getActiveProject()) != null){
                            log.info("send active project to frontend");
                            return projectRepository.getProjectedById(user.getActiveProject());
                        } else {
                            log.info("active project not found, active project set to 0");
                            user.setActiveProject(0L);
                            userRepository.save(user);
                        }
                    }
                }
                log.info("send dummy project to frontend");
                return ProjectDto.builder()
                        .name("Kein Projekt ausgewählt")
                        .build();
            }
            log.info("send dummy project to frontend");
            return ProjectDto.builder()
                    .name("Kein Projekt ausgewählt")
                    .build();
        }
        return null;
    }

    public ProjectDto addProject(ProjectDto projectDto, String template) {
        if(projectRepository.findProjectByNameIgnoreCase(projectDto.getName()) == null){
            //Init Setting Lists
            List<HeaderDataSetting> headerDataSettings = new ArrayList<>();
            List<TaskSetting> specificationSettings = new ArrayList<>();
            List<TaskSetting> projectSettings = new ArrayList<>();
            List<TaskSetting> controlSettings = new ArrayList<>();
            List<TaskSetting> documentationSettings = new ArrayList<>();
            List<TechnicalDataSetting> technicalDataSettings = new ArrayList<>();
            String versionTodo = "Projekt neu angelegt";

            Project saveProject = Project.builder()
                    .archived(projectDto.getArchived())
                    .name(projectDto.getName())
                    .description(projectDto.getDescription())
                    .amountStations(projectDto.getAmountStations())
                    .inProgressStations(projectDto.getInProgressStations())
                    .storedStations(projectDto.getStoredStations())
                    .notStoredStations(projectDto.getNotStoredStations())
                    .headerDataSetting(headerDataSettings)
                    .specificationSetting(specificationSettings)
                    .projectionSetting(projectSettings)
                    .controlSetting(controlSettings)
                    .documentationSetting(documentationSettings)
                    .technicalDataSetting(technicalDataSettings)
                    .build();

            projectRepository.save(saveProject);

            //Fetch saved Project so Lists are initialized
            saveProject = projectRepository.findProjectByNameIgnoreCase(projectDto.getName());


            if(!template.equals("Neu")){
                Project templateProject = projectRepository.findProjectByNameIgnoreCase(template);
                if(templateProject != null){
                    //copy settings
                    log.info("copying project settings from template '{}'", template);
                    versionTodo = "Projekt erstellt aus Template '" + template +"'";
                    //headerData
                    List<HeaderDataSetting> headerDataSettingListTemplate = headerDataSettingRepository.findAllByProjectIdOrderByIdAsc(templateProject.getId());
                    if(!headerDataSettingListTemplate.isEmpty()){
                        for(HeaderDataSetting headerDataSetting : headerDataSettingListTemplate){
                            HeaderDataSetting newHeaderDataSetting = HeaderDataSetting.builder()
                                    .item(headerDataSetting.getItem())
                                    .type(headerDataSetting.getType())
                                    .project(saveProject)
                                    .build();
                            saveProject.addHeaderData(newHeaderDataSetting);
                            log.info("adding header data '{}' to new project '{}'", headerDataSetting.getItem(),  saveProject.getName());
                        }
                    }
                    //projection
                    List<TaskSetting> projectionSettingListTemplate = taskSettingRepository.findAllByProjectIdAndTypeOrderByIdAsc(templateProject.getId(), "projection");
                    if(!projectionSettingListTemplate.isEmpty()){
                        for(TaskSetting taskSetting : projectionSettingListTemplate){
                            TaskSetting newTaskSetting = TaskSetting.builder()
                                    .item(taskSetting.getItem())
                                    .type(taskSetting.getType())
                                    .project(saveProject)
                                    .build();
                            saveProject.addProjection(newTaskSetting);
                            log.info("adding projection '{}' to new project '{}'", taskSetting.getItem(), saveProject.getName());
                        }
                    }
                    //specification
                    List<TaskSetting> specificationSettingListTemplate = taskSettingRepository.findAllByProjectIdAndTypeOrderByIdAsc(templateProject.getId(), "specification");
                    if(!specificationSettingListTemplate.isEmpty()){
                        for(TaskSetting taskSetting : specificationSettingListTemplate){
                            TaskSetting newTaskSetting = TaskSetting.builder()
                                    .item(taskSetting.getItem())
                                    .type(taskSetting.getType())
                                    .project(saveProject)
                                    .build();
                            saveProject.addSpecification(newTaskSetting);
                            log.info("adding specification '{}' to new project '{}'", taskSetting.getItem(), saveProject.getName());
                        }
                    }
                    //control
                    List<TaskSetting> controlSettingListTemplate = taskSettingRepository.findAllByProjectIdAndTypeOrderByIdAsc(templateProject.getId(), "control");
                    if(!controlSettingListTemplate.isEmpty()){
                        for(TaskSetting taskSetting : controlSettingListTemplate){
                            TaskSetting newTaskSetting = TaskSetting.builder()
                                    .item(taskSetting.getItem())
                                    .type(taskSetting.getType())
                                    .project(saveProject)
                                    .build();
                            saveProject.addControl(newTaskSetting);
                            log.info("adding control '{}' to new project '{}'", taskSetting.getItem(), saveProject.getName());
                        }
                    }
                    //documentation
                    List<TaskSetting> documentationSettingListTemplate = taskSettingRepository.findAllByProjectIdAndTypeOrderByIdAsc(templateProject.getId(), "doku");
                    if(!documentationSettingListTemplate.isEmpty()){
                        for(TaskSetting taskSetting : documentationSettingListTemplate){
                            TaskSetting newTaskSetting = TaskSetting.builder()
                                    .item(taskSetting.getItem())
                                    .type(taskSetting.getType())
                                    .project(saveProject)
                                    .build();
                            saveProject.addDocumentation(newTaskSetting);
                            log.info("adding documentation '{}' to new project '{}'", taskSetting.getItem(), saveProject.getName());
                        }
                    }
                    //technical data
                    List<TechnicalDataSetting> technicalDataSettingListTemplate = technicalDataSettingRepository.findAllByProjectIdOrderByIdAsc(templateProject.getId());
                    if(!technicalDataSettingListTemplate.isEmpty()){
                        for(TechnicalDataSetting technicalDataSetting : technicalDataSettingListTemplate){
                            TechnicalDataSetting newTechnicalDataSetting = TechnicalDataSetting.builder()
                                    .item(technicalDataSetting.getItem())
                                    .unit(technicalDataSetting.getUnit())
                                    .project(saveProject)
                                    .build();
                            saveProject.addTechnicalData(newTechnicalDataSetting);
                            log.info("adding technical data '{}' to new project '{}'", technicalDataSetting.getItem(), saveProject.getName());
                        }
                    }
                }
                projectRepository.save(saveProject);
            }

//            Add start Version to Project
            Version startVersion = Version.builder()
                    .version("1.0")
                    .toDo(versionTodo)
                    .done(true)
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")))
                    .project(projectRepository.findTopByOrderByIdDesc())
                    .build();
            versionRepository.save(startVersion);
            log.info("Project '" + projectDto.getName() + "' created");
            return projectRepository.findProjectedByNameIgnoreCase(projectDto.getName());
        }
        return null;
    }

    public ProjectDto updateProject(ProjectDto projectDto) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectDto.getId());
        if(optionalProject.isPresent()){
            if(projectRepository.findProjectByNameIgnoreCase(projectDto.getName()) == null){
                Project saveProject = optionalProject.get();
                saveProject.setArchived(projectDto.getArchived());
                saveProject.setName(projectDto.getName());
                saveProject.setDescription(projectDto.getDescription());
                saveProject.setAmountStations(projectDto.getAmountStations());
                saveProject.setInProgressStations(projectDto.getInProgressStations());
                saveProject.setStoredStations(projectDto.getStoredStations());
                saveProject.setNotStoredStations(projectDto.getNotStoredStations());

                if(saveProject.getArchived()){
                    List<User> userList = userRepository.findUserByActiveProject(saveProject.getId());
                    for(User user : userList){
                        user.setActiveProject(0L);
                    }
                }

                projectRepository.save(saveProject);
                return projectRepository.getProjectedById(projectDto.getId());
            } else {
                log.error("Project with name '{}' already exist", projectDto.getName());
            }
        }else {
            log.error("Project with ID{} does not exist", projectDto.getId());
        }
        return null;
    }

    public void deleteProject(Long projectId) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectId);
        if(optionalProject.isPresent()){
            List<User> userList = userRepository.findUserByActiveProject(projectId);
            for(User user : userList){
                user.setActiveProject(0L);
            }
            projectRepository.delete(optionalProject.get());
        }else log.error("Project with ID " + projectId +" does not exist");
    }

//    ########################## addition ##############################

    public void updateStationAmount(Project project){
        List<Station> station = project.getStations();
        if(station != null){
            int amountStations = 0;
            int inProgressStations = 0;
            int storedStations = 0;
            int notStoredStations = 0;
            if(!station.isEmpty()){
                //amount stations
                amountStations = station.size();

                for(Station stations : station){
                    if(stations.getStatus() == StatusEPLAN.INARBEIT){
                        inProgressStations += 1;
                    } else if(stations.getStatus() == StatusEPLAN.AUSGELAGERT){
                        notStoredStations += 1;
                    } else if (stations.getStatus() == StatusEPLAN.EINGELAGERT){
                        storedStations += 1;
                    }
                }
            }
            project.setAmountStations(amountStations);
            project.setInProgressStations(inProgressStations);
            project.setStoredStations(storedStations);
            project.setNotStoredStations(notStoredStations);

            projectRepository.save(project);
        }
    }
}
