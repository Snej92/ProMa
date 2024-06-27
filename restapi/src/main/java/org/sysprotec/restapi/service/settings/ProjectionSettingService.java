package org.sysprotec.restapi.service.settings;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;
import org.sysprotec.restapi.repository.overview.TaskRepository;
import org.sysprotec.restapi.repository.settings.TaskSettingRepository;
import org.sysprotec.restapi.service.overview.ProjectionService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectionSettingService {
    private final TaskSettingRepository taskSettingRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProjectionService projectionService;

    public List<TaskSetting> getProjectionSetting() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                return taskSettingRepository.findAllByProjectIdAndTypeOrderByIdDesc(user.getActiveProject(), "projection");
            }
        }
        return null;
    }

    public TaskSetting addProjectionSetting(TaskSetting taskSetting) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                Optional<Project> optionalProject = projectRepository.findProjectById(user.getActiveProject());
                if (optionalProject.isEmpty()) {
                    log.error("Project with id " + user.getActiveProject() + " does not exist in database");
                } else {
                    Project saveProject = optionalProject.get();
                    //add LOPSetting to Project
                    taskSetting.setProject(saveProject);
                    taskSetting.setType("projection");
                    saveProject.addProjection(taskSetting);
                    projectRepository.save(saveProject);
                    log.info("ProjectionSetting Punkt: '" + taskSetting.getName() + "' zu '" + saveProject.getName() + "' hinzugefügt");
                    TaskSetting newTaskSetting = taskSettingRepository.findTopByOrderByIdDesc();
                    projectionService.createProjectionForStations(newTaskSetting);
                    return newTaskSetting;
                }
            }
        }
        return null;
    }

    @Transactional
    public void updateProjectionSetting(TaskSetting taskSetting) {
        Optional<TaskSetting> optionalTaskSetting = taskSettingRepository.findById(taskSetting.getId());
        if(optionalTaskSetting.isEmpty()){
            log.error("Projection with id "+ taskSetting.getId() + " does not exist in database");
        } else {
            TaskSetting saveTaskSetting = optionalTaskSetting.get();
            saveTaskSetting.setName(taskSetting.getName());
            log.info("Projection with id " + taskSetting.getId() + " updated");
        }
    }

    public void deleteProjectionSetting(Long taskSettingId) {
        Optional<TaskSetting> optionalTaskSetting = taskSettingRepository.findById(taskSettingId);
        Optional<Project> optionalProject = projectRepository.findProjectByProjectionSettingId(taskSettingId);
        if(optionalTaskSetting.isEmpty() || optionalProject.isEmpty()){
            log.error("Projection setting with id "+ taskSettingId + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            List<Station> stationList = saveProject.getStations();
            for (Station station : stationList) {
                station.removeProjection(taskSettingId);
                log.info("Projektierung : '" + optionalTaskSetting.get().getName() + "' von '" + station.getName() + "' entfernt");
            }
            List<Task> taskList = taskRepository.findAllByTaskSettingId(taskSettingId);
            taskRepository.deleteAll(taskList);

            saveProject.removeProjection(taskSettingId);
            log.info("Projektierung : '" + optionalTaskSetting.get().getName() + "' von '" + saveProject.getName() + "' entfernt");
            taskSettingRepository.deleteById(taskSettingId);
        }
    }
}
