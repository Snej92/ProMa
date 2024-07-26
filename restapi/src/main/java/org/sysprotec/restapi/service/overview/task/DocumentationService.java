package org.sysprotec.restapi.service.overview.task;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.settings.TaskSetting;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.StationRepository;
import org.sysprotec.restapi.repository.overview.TaskRepository;
import org.sysprotec.restapi.service.HistoryService;
import org.sysprotec.restapi.service.UserService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentationService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final StationRepository stationRepository;
    private final UserService userService;
    private final HistoryService historyService;

    public List<Task> getDocumentation(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            return taskRepository.findAllByTaskSettingTypeAndStationId("doku", stationId);
        }
        return null;
    }


    @Transactional
    public Task updateDocumentation(Task task) {
        Optional<Task> optionalTask = taskRepository.findById(task.getId());
        if(optionalTask.isEmpty()){
            log.error("Documentation with id "+ task.getId() + " does not exist in database");
        } else {
            String historyText = "";

            TaskSetting taskSetting = optionalTask.get().getTaskSetting();
            Task saveTask = optionalTask.get();

            if(saveTask.getDone() != task.getDone()){
                if(task.getDone()){
                    historyText = "Doku '" + saveTask.getTaskSetting().getItem() + "' auf 'erledigt' geändert";
                    log.info("Doku '" + saveTask.getTaskSetting().getItem() + "' auf 'erledigt' geändert");
                } else {
                    historyText = "Doku '" + saveTask.getTaskSetting().getItem() + "' auf 'nicht erledigt' geändert";
                    log.info("Doku '" + saveTask.getTaskSetting().getItem() + "' auf 'nicht erledigt' geändert");
                }
            } else if(saveTask.getCommited() != task.getCommited()){
                if(task.getCommited()){
                    historyText = "Doku '" + saveTask.getTaskSetting().getItem() + "' auf 'übergeben' geändert";
                    log.info("Doku '" + saveTask.getTaskSetting().getItem() + "' auf 'übergeben' geändert");
                } else{
                    historyText = "Doku '" + saveTask.getTaskSetting().getItem() + "' auf 'nicht übergeben' geändert";
                    log.info("Doku '" + saveTask.getTaskSetting().getItem() + "' auf 'nicht übergeben' geändert");
                }
            } else if(!Objects.equals(saveTask.getAddition(), task.getAddition())){
                historyText = "Doku Zusatz geändert auf '" + task.getAddition() + "'";
                log.info("Doku Zusatz geändert auf '" + task.getAddition() + "'");
            }

            saveTask.setTaskSetting(taskSetting);
            saveTask.setDateDone(task.getDateDone());
            saveTask.setDateCommited(task.getDateCommited());
            saveTask.setAddition(task.getAddition());
            saveTask.setDone(task.getDone());
            saveTask.setCommited(task.getCommited());
            User user = userService.getLoggedUser();

            historyService.newEntryAuto(
                    user,
                    saveTask.getStation().getId(),
                    historyText);
            return saveTask;
        }
        return null;
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
                                .station(station)
                                .build();
                        taskRepository.save(task);
                        log.info("Added Documentation Task '" + task.getTaskSetting().getItem() + "' to station '" + station.getName() + "'");
                    }
                }
            }
        }
    }
}