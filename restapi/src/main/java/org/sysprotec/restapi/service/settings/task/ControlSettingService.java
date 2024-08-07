package org.sysprotec.restapi.service.settings.task;


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
import org.sysprotec.restapi.service.StationService;
import org.sysprotec.restapi.service.overview.task.ControlService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ControlSettingService {
    private final TaskSettingRepository taskSettingRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final StationService stationService;

    public List<TaskSetting> getControlSetting() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                return taskSettingRepository.findAllByProjectIdAndTypeOrderByIdAsc(user.getActiveProject(), "control");
            }
        }
        return null;
    }

    public TaskSetting addControlSetting(TaskSetting taskSetting) {
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
                    taskSetting.setType("control");
                    saveProject.addControl(taskSetting);

                    projectRepository.save(saveProject);

                    log.info("ControlSetting Punkt: '" + taskSetting.getItem() + "' zu '" + saveProject.getName() + "' hinzugefügt");
                    TaskSetting newTaskSetting = taskSettingRepository.findTopByOrderByIdDesc();
                    stationService.createControlForStations(newTaskSetting);

                    return newTaskSetting;
                }
            }
        }
        return null;
    }

    @Transactional
    public void updateControlSetting(TaskSetting taskSetting) {
        Optional<TaskSetting> optionalTaskSetting = taskSettingRepository.findById(taskSetting.getId());
        if(optionalTaskSetting.isEmpty()){
            log.error("Control with id "+ taskSetting.getId() + " does not exist in database");
        } else {
            TaskSetting saveTaskSetting = optionalTaskSetting.get();
            saveTaskSetting.setItem(taskSetting.getItem());

            //Update Progress
            for(Station station : taskSetting.getProject().getStations()){
                stationService.updateStationControlProgress(station);
            }

            log.info("Control with id " + taskSetting.getId() + " updated");
        }
    }

    public void deleteControlSetting(Long taskSettingId) {
        Optional<TaskSetting> optionalTaskSetting = taskSettingRepository.findById(taskSettingId);
        Optional<Project> optionalProject = projectRepository.findProjectByControlSettingId(taskSettingId);
        if(optionalTaskSetting.isEmpty() || optionalProject.isEmpty()){
            log.error("Control setting with id "+ taskSettingId + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            List<Station> stationList = saveProject.getStations();
            for (Station station : stationList) {
                station.removeControl(taskSettingId);
                log.info("Kontrolle : '" + optionalTaskSetting.get().getItem() + "' von '" + station.getName() + "' entfernt");
            }
            List<Task> taskList = taskRepository.findAllByTaskSettingId(taskSettingId);
            taskRepository.deleteAll(taskList);

            saveProject.removeControl(taskSettingId);
            log.info("Kontrolle : '" + optionalTaskSetting.get().getItem() + "' von '" + saveProject.getName() + "' entfernt");
            taskSettingRepository.deleteById(taskSettingId);

            //Update Progress
            for(Station station : optionalTaskSetting.get().getProject().getStations()){
                stationService.updateStationControlProgress(station);
            }
        }
    }
}
