package org.sysprotec.restapi.service.overview;

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
public class SpecificationService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final StationRepository stationRepository;
    private final UserService userService;
    private final HistoryService historyService;

    public List<Task> getSpecification(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            if(optionalStation.get().getSpecification() != null) {
                return optionalStation.get().getSpecification();
            }
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
                    historyText = "Vorgabe '" + saveTask.getTaskSetting().getName() + "' auf 'erledigt' geändert";
                } else {
                    historyText = "Vorgabe '" + saveTask.getTaskSetting().getName() + "' auf 'nicht erledigt' geändert";
                }
            } else if(saveTask.getCommited() != task.getCommited()){
                if(task.getCommited()){
                    historyText = "Vorgabe '" + saveTask.getTaskSetting().getName() + "' auf 'übergeben' geändert";
                } else{
                    historyText = "Vorgabe '" + saveTask.getTaskSetting().getName() + "' auf 'nicht übergeben' geändert";
                }
            } else if(!Objects.equals(saveTask.getAddition(), task.getAddition())){
                historyText = "Vorgabe Zusatz geändert auf '" + task.getAddition() + "'";
            }

            saveTask.setTaskSetting(taskSetting);
            saveTask.setDate(task.getDate());
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


    public void createSpecificationForStations(TaskSetting taskSetting) {
        Optional<Project> optionalProject = projectRepository.findProjectById(taskSetting.getProject().getId());
        if(optionalProject.isPresent()) {
            List<Station> stationList = optionalProject.get().getStations();
            for(Station station : stationList) {
                if (stationRepository.findStationByNameAndSpecificationTaskSettingId(station.getName(), taskSetting.getId()).isEmpty()) {
                    Task task = Task.builder()
                            .taskSetting(taskSetting)
                            .date("")
                            .addition("")
                            .done(false)
                            .commited(false)
                            .station(station)
                            .build();
                    taskRepository.save(task);
                    log.info("Added Specification Task '" + task.getTaskSetting().getName() + "' to station '" + station.getName() + "'");
                }
            }
        }
    }
}
