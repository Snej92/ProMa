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
import org.sysprotec.restapi.service.overview.task.DocumentationService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentationSettingService {
    private final TaskSettingRepository taskSettingRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final DocumentationService documentationService;

    public List<TaskSetting> getDocumentationSetting() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String username = authentication.getName();
            User user = userRepository.findUserByUsernameIgnoreCase(username);
            if (user != null) {
                return taskSettingRepository.findAllByProjectIdAndTypeOrderByIdDesc(user.getActiveProject(), "doku");
            }
        }
        return null;
    }

    public TaskSetting addDocumentationSetting(TaskSetting taskSetting) {
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
                    //add DocumentationSetting to Project
                    taskSetting.setProject(saveProject);
                    taskSetting.setType("doku");
                    saveProject.addDocumentation(taskSetting);

                    projectRepository.save(saveProject);

                    log.info("DocumentationSetting Punkt: '" + taskSetting.getItem() + "' zu '" + saveProject.getName() + "' hinzugefügt");
                    TaskSetting newTaskSetting = taskSettingRepository.findTopByOrderByIdDesc();
                    documentationService.createDocumentationForStations(newTaskSetting);

                    return newTaskSetting;
                }
            }
        }
        return null;
    }

    @Transactional
    public void updateDocumentationSetting(TaskSetting taskSetting) {
        Optional<TaskSetting> optionalTaskSetting = taskSettingRepository.findById(taskSetting.getId());
        if(optionalTaskSetting.isEmpty()){
            log.error("Documentation with id "+ taskSetting.getId() + " does not exist in database");
        } else {
            TaskSetting saveTaskSetting = optionalTaskSetting.get();
            saveTaskSetting.setItem(taskSetting.getItem());
            log.info("Documentation with id " + taskSetting.getId() + " updated");
        }
    }

    public void deleteDocumentationSetting(Long taskSettingId) {
        Optional<TaskSetting> optionalTaskSetting = taskSettingRepository.findById(taskSettingId);
        Optional<Project> optionalProject = projectRepository.findProjectByDocumentationSettingId(taskSettingId);
        if(optionalTaskSetting.isEmpty() || optionalProject.isEmpty()){
            log.error("Documentation setting with id "+ taskSettingId + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            List<Station> stationList = saveProject.getStations();
            for (Station station : stationList) {
                station.removeDocumentation(taskSettingId);
                log.info("Dokumentation : '" + optionalTaskSetting.get().getItem() + "' von '" + station.getName() + "' entfernt");
            }
            List<Task> taskList = taskRepository.findAllByTaskSettingId(taskSettingId);
            taskRepository.deleteAll(taskList);

            saveProject.removeDocumentation(taskSettingId);
            log.info("Dokumentation : '" + optionalTaskSetting.get().getItem() + "' von '" + saveProject.getName() + "' entfernt");
            taskSettingRepository.deleteById(taskSettingId);
        }
    }
}
