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
public class ControlService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final StationRepository stationRepository;
    private final UserService userService;
    private final HistoryService historyService;

    public List<Task> getControl(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            return taskRepository.findAllByTaskSettingTypeAndStationId("control", stationId);
        }
        return null;
    }


    @Transactional
    public Task updateControl(Task task) {
        Optional<Task> optionalTask = taskRepository.findById(task.getId());
        if(optionalTask.isEmpty()){
            log.error("Control with id "+ task.getId() + " does not exist in database");
        } else {
            String historyText = "";

            TaskSetting taskSetting = optionalTask.get().getTaskSetting();
            Task saveTask = optionalTask.get();

            if(saveTask.getDone() != task.getDone()){
                if(task.getDone()){
                    historyText = "Kontrolle '" + saveTask.getTaskSetting().getItem() + "' auf 'erledigt' geändert";
                } else {
                    historyText = "Kontrolle '" + saveTask.getTaskSetting().getItem() + "' auf 'nicht erledigt' geändert";
                }
            } else if(saveTask.getCommited() != task.getCommited()){
                if(task.getCommited()){
                    historyText = "Kontrolle '" + saveTask.getTaskSetting().getItem() + "' auf 'übergeben' geändert";
                } else{
                    historyText = "Kontrolle '" + saveTask.getTaskSetting().getItem() + "' auf 'nicht übergeben' geändert";
                }
            } else if(!Objects.equals(saveTask.getAddition(), task.getAddition())){
                historyText = "Kontrolle Zusatz geändert auf '" + task.getAddition() + "'";
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
            return taskRepository.findById(task.getId()).get();
        }
        return null;
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
                            .station(station)
                            .build();
                    taskRepository.save(task);
                    log.info("Added Control Task '" + task.getTaskSetting().getItem() + "' to station '" + station.getName() + "'");
                }
            }
        }
    }
}