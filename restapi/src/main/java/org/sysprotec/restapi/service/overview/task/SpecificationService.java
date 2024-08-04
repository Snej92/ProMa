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
import org.sysprotec.restapi.service.StationService;
import org.sysprotec.restapi.service.UserService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpecificationService {
    private final TaskRepository taskRepository;
    private final StationRepository stationRepository;
    private final UserService userService;
    private final HistoryService historyService;
    private final StationService stationService;

    public List<Task> getSpecification(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            return taskRepository.findAllByTaskSettingTypeAndStationId("specification", stationId);
        }
        return null;
    }


    @Transactional
    public Task updateSpecification(Task task) {
        Optional<Task> optionalTask = taskRepository.findById(task.getId());
        if(optionalTask.isEmpty()){
            log.error("Specification with id "+ task.getId() + " does not exist in database");
        } else {
            String historyText = "";

            TaskSetting taskSetting = optionalTask.get().getTaskSetting();
            Task saveTask = optionalTask.get();

            if(saveTask.getDone() != task.getDone()){
                if(task.getDone()){
                    historyText = "Vorgabe '" + saveTask.getTaskSetting().getItem() + "' auf 'erledigt' geändert";
                } else {
                    historyText = "Vorgabe '" + saveTask.getTaskSetting().getItem() + "' auf 'nicht erledigt' geändert";
                }
            } else if(saveTask.getCommited() != task.getCommited()){
                if(task.getCommited()){
                    historyText = "Vorgabe '" + saveTask.getTaskSetting().getItem() + "' auf 'übergeben' geändert";
                } else{
                    historyText = "Vorgabe '" + saveTask.getTaskSetting().getItem() + "' auf 'nicht übergeben' geändert";
                }
            } else if(!Objects.equals(saveTask.getAddition(), task.getAddition())){
                historyText = "Vorgabe Zusatz geändert auf '" + task.getAddition() + "'";
            }

            saveTask.setTaskSetting(taskSetting);
            saveTask.setDateDone(task.getDateDone());
            saveTask.setDateCommited(task.getDateCommited());
            saveTask.setAddition(task.getAddition());
            saveTask.setDone(task.getDone());
            saveTask.setCommited(task.getCommited());
            User user = userService.getLoggedUser();

            stationService.updateStationSpecificationProgress(stationRepository.getStationBySpecificationId(task.getId()));

            historyService.newEntryAuto(
                    user,
                    saveTask.getStation().getId(),
                    historyText);
            return saveTask;
        }
        return null;
    }
}
