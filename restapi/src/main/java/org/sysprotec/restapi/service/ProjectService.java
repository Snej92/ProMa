package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.deserialization.ProjectViewImpl;
import org.sysprotec.restapi.model.project.Project;
import org.sysprotec.restapi.model.project.ProjectFavorite;
import org.sysprotec.restapi.model.projections.ProjectFavView;
import org.sysprotec.restapi.model.projections.ProjectView;
import org.sysprotec.restapi.model.settings.HeaderDataSetting;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.model.settings.TechnicalDataSetting;
import org.sysprotec.restapi.model.settings.Version;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.repository.AssignmentRepository;
import org.sysprotec.restapi.repository.ProjectFavoriteRepository;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;
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
    private final ProjectFavoriteRepository projectFavoriteRepository;
    private final AssignmentRepository assignmentRepository;

    public List<ProjectFavView> getAllProjects(Boolean archive, Boolean all) {
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            List<ProjectView> projectViews;
            if(!all){
                projectViews = projectRepository.findProjectsProjectedByArchivedOrderById(archive);
            } else {
                projectViews = projectRepository.findAllProjectedByOrderByName();
            }

            List<ProjectFavView> projectFavViewList = new ArrayList<>();

            for(ProjectView projectView : projectViews){
                //check if favorite
                Optional<ProjectFavorite> projectFavorite = projectFavoriteRepository.findByUserIdAndProjectId(loggedUser.getId(), projectView.getId());
                boolean favorite = projectFavorite.isPresent();

                ProjectFavView projectFavView = ProjectFavView.builder()
                        .project(projectView)
                        .isFavorite(favorite)
                        .build();

                projectFavViewList.add(projectFavView);
            }

            return projectFavViewList;

        } else {
            log.error("no user logged in");
        }
        return null;
    }

    public ProjectFavView getActiveProject() {
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

                            //check if favorite
                            Optional<ProjectFavorite> projectFavorite = projectFavoriteRepository.findByUserIdAndProjectId(user.getId(), user.getActiveProject());
                            boolean favorite = projectFavorite.isPresent();

                            return  ProjectFavView.builder()
                                    .project(projectRepository.getProjectedById(user.getActiveProject()))
                                    .isFavorite(favorite)
                                    .build();
                        } else {
                            log.info("active project not found, active project set to 0");
                            user.setActiveProject(0L);
                            userRepository.save(user);
                        }
                    }
                }
            }
        }
        ProjectView projectView = ProjectViewImpl.builder()
                .name("Kein Projekt ausgewählt")
                .build();

        return ProjectFavView.builder()
                .project(projectView)
                .isFavorite(false)
                .build();
    }

    public ProjectFavView addProject(ProjectFavView projectFavView, String template) {
        if(projectRepository.findProjectByNameIgnoreCase(projectFavView.getProject().getName()) == null){
            //Init Setting Lists
            List<HeaderDataSetting> headerDataSettings = new ArrayList<>();
            List<TaskSetting> specificationSettings = new ArrayList<>();
            List<TaskSetting> projectSettings = new ArrayList<>();
            List<TaskSetting> controlSettings = new ArrayList<>();
            List<TaskSetting> documentationSettings = new ArrayList<>();
            List<TechnicalDataSetting> technicalDataSettings = new ArrayList<>();
            String versionTodo = "Projekt neu angelegt";

            Project saveProject = Project.builder()
                    .archived(projectFavView.getProject().getArchived())
                    .color(projectFavView.getProject().getColor())
                    .acronym(projectFavView.getProject().getAcronym())
                    .name(projectFavView.getProject().getName())
                    .description(projectFavView.getProject().getDescription())
                    .amountStations(projectFavView.getProject().getAmountStations())
                    .inProgressStations(projectFavView.getProject().getInProgressStations())
                    .storedStations(projectFavView.getProject().getStoredStations())
                    .notStoredStations(projectFavView.getProject().getNotStoredStations())
                    .headerDataSetting(headerDataSettings)
                    .specificationSetting(specificationSettings)
                    .projectionSetting(projectSettings)
                    .controlSetting(controlSettings)
                    .documentationSetting(documentationSettings)
                    .technicalDataSetting(technicalDataSettings)
                    .build();

            if(saveProject.getColor() == null){
                saveProject.setColor("#ffffff");
            }

            projectRepository.save(saveProject);

            //Fetch saved Project so Lists are initialized
            saveProject = projectRepository.findProjectByNameIgnoreCase(projectFavView.getProject().getName());


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
            log.info("Project '" + projectFavView.getProject().getName() + "' created");
            return ProjectFavView.builder()
                    .project(projectRepository.findProjectedByNameIgnoreCase(projectFavView.getProject().getName()))
                    .isFavorite(false)
                    .build();
        }
        return null;
    }

    public ProjectFavView updateProject(ProjectFavView projectFavView) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectFavView.getProject().getId());
        if(optionalProject.isPresent()){
            if(projectRepository.findProjectByNameIgnoreCase(projectFavView.getProject().getName()) == null
                    || projectFavView.getProject().getName().equals(optionalProject.get().getName())){
                Project saveProject = optionalProject.get();
                saveProject.setArchived(projectFavView.getProject().getArchived());
                saveProject.setColor(projectFavView.getProject().getColor());
                saveProject.setAcronym(projectFavView.getProject().getAcronym());
                saveProject.setName(projectFavView.getProject().getName());
                saveProject.setDescription(projectFavView.getProject().getDescription());
                saveProject.setAmountStations(projectFavView.getProject().getAmountStations());
                saveProject.setInProgressStations(projectFavView.getProject().getInProgressStations());
                saveProject.setStoredStations(projectFavView.getProject().getStoredStations());
                saveProject.setNotStoredStations(projectFavView.getProject().getNotStoredStations());
                saveProject.setImage(projectFavView.getProject().getImage());

                if(saveProject.getArchived()){
                    List<User> userList = userRepository.findUserByActiveProject(saveProject.getId());
                    for(User user : userList){
                        user.setActiveProject(0L);
                    }
                }

                projectRepository.save(saveProject);

                //update Assignments
                Optional<List<Assignment>> optionalAssignmentList = assignmentRepository.findAssignmentsByProjectId(saveProject.getId());
                if(optionalAssignmentList.isPresent()){
                    for(Assignment assignment : optionalAssignmentList.get()){
                        assignment.setColor(saveProject.getColor());
                        assignment.setProjectAcronym(saveProject.getAcronym());
                        assignmentRepository.save(assignment);
                    }
                }

                return ProjectFavView.builder()
                        .project(projectRepository.getProjectedById(projectFavView.getProject().getId()))
                        .isFavorite(projectFavView.getIsFavorite())
                        .build();
            } else {
                log.error("Project with name '{}' already exist", projectFavView.getProject().getName());
            }
        }else {
            log.error("Project with ID{} does not exist", projectFavView.getProject().getId());
        }
        return null;
    }

    public void deleteProject(Long projectId) {
        Optional<Project> optionalProject = projectRepository.findProjectById(projectId);
        if(optionalProject.isPresent()){
            //Set User active Project to 0
            List<User> userList = userRepository.findUserByActiveProject(projectId);
            for(User user : userList){
                user.setActiveProject(0L);
            }

            //Remove all favorites
            Optional<List<ProjectFavorite>> optionalProjectFavorites = projectFavoriteRepository.findByProjectId(projectId);
            optionalProjectFavorites.ifPresent(projectFavoriteRepository::deleteAll);
            projectRepository.delete(optionalProject.get());
        }else log.error("Project with ID " + projectId +" does not exist");
    }

    public void editFavorite(Long projectId, Boolean remove) {
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            if(!remove){
                if(projectRepository.findProjectById(projectId).isPresent()
                        && projectFavoriteRepository.findByUserIdAndProjectId(loggedUser.getId(), projectId).isEmpty()){
                    ProjectFavorite projectFavorite = ProjectFavorite.builder()
                            .userId(loggedUser.getId())
                            .projectId(projectId)
                            .build();
                    loggedUser.addProjectFavorite(projectFavorite);
                    userRepository.save(loggedUser);
                    log.info("project with id {} favored by {}", projectId, loggedUser.getUsername());
                } else {
                    log.error("project with id {} does not exist or is already favored by {}", projectId, loggedUser.getUsername());
                }
            } else {
                Optional<ProjectFavorite> optionalProjectFavorite = projectFavoriteRepository.findByUserIdAndProjectId(loggedUser.getId(), projectId);
                if(optionalProjectFavorite.isPresent()){
                    loggedUser.removeProjectFavorite(optionalProjectFavorite.get().getId());
                    projectFavoriteRepository.delete(optionalProjectFavorite.get());
                    log.info("project with id {} removed as favorite by {}", projectId, loggedUser.getUsername());
                } else {
                    log.error("project with id {} is not favored by {}", projectId, loggedUser.getUsername());
                }
            }
        } else {
            log.error("No User logged in");
        }
    }

    public List<ProjectFavView> getFavorites(){
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            List<ProjectFavorite> projectFavorite = loggedUser.getProjectFavorite();
            List<ProjectFavView> projectFavViews = new ArrayList<>();
            if(projectFavorite != null && !projectFavorite.isEmpty()){
                for(ProjectFavorite projectFavoriteItem : projectFavorite){
                    ProjectView projectView = projectRepository.findProjectProjectedById(projectFavoriteItem.getProjectId());
                    if(projectView != null){
                        ProjectFavView projectFavView = ProjectFavView.builder()
                                .project(projectView)
                                .isFavorite(true)
                                .build();
                        projectFavViews.add(projectFavView);
                    }
                }
            }
            return projectFavViews;
        }
        return null;
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
