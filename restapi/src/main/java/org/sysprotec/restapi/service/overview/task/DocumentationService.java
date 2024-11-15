package org.sysprotec.restapi.service.overview.task;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.settings.TaskSetting;
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
public class DocumentationService {
    private final TaskRepository taskRepository;
    private final StationRepository stationRepository;
    private final UserService userService;
    private final HistoryService historyService;
    private final StationService stationService;

    public List<Task> getDocumentation(Long stationId) {
        Optional<Station> optionalStation = stationRepository.findById(stationId);
        if (optionalStation.isPresent()) {
            return taskRepository.findAllByTaskSettingTypeAndStationIdOrderByIdAsc("doku", stationId);
        }
        return null;
    }


    @Transactional
    public Task updateDocumentation(Task task) {
        Optional<Task> optionalTask = taskRepository.findById(task.getId());
        if(optionalTask.isEmpty()){
            log.error("Documentation with id "+ task.getId() + " does not exist in database");
        } else {
            User loggedUser = userService.getLoggedUser();
            String historyText = "";
            String acronym = "";
            String name = "";

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
                acronym = loggedUser.getAcronym();
                name = loggedUser.getFirstname() + " " + loggedUser.getLastname();
                saveTask.setIssuerAcronym(acronym);
                saveTask.setIssuerName(name);
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


            stationService.updateStationDocumentationProgress(stationRepository.getStationByDocumentationId(task.getId()));

            historyService.newEntryAuto(
                    saveTask.getStation().getId(),
                    historyText);
            return saveTask;
        }
        return null;
    }
}