package org.sysprotec.restapi.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.Assignment;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.repository.AssignmentRepository;
import org.sysprotec.restapi.repository.ProjectRepository;
import org.sysprotec.restapi.repository.UserRepository;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;


    public List<Assignment> getAssignment(String date) {
        //Extract month and year as int from date
        log.info("check Assignments for users");

        String[] split = date.split("\\.");
        int month = Integer.parseInt(split[0]);
        int year = Integer.parseInt(split[1]);
        log.info("Month: {} Year: {}" , month, year);

        YearMonth yearMonth = YearMonth.of(year, month);
        int amountDays = yearMonth.lengthOfMonth();
        log.info("Amount days: {}", amountDays);

        //Check if for all users Assignments for selected date exist
        //Date has to be in the following format: MM.YYYY
        List<User> users = userRepository.findAll();
        for(User user : users) {
            Optional<List<Assignment>> optionalAssignmentList = assignmentRepository.findAssignmentsByUserIdAndDateContaining(user.getId(), date);
            if(optionalAssignmentList.isPresent()){
                if(optionalAssignmentList.get().isEmpty()){
                    //If empty, create assignment for each day of the selected month
                    log.info("No assignment found for user: {}", user.getUsername());
                    for(int i = 1; i<=amountDays; i++){
                        String day = String.format("%02d.%02d.%04d", i, month, year);
                        Assignment assignment = Assignment.builder()
                                .projectId(0L)
                                .projectAcronym("")
                                .userId(user.getId())
                                .userAcronym(user.getAcronym())
                                .date(day)
                                .color("")
                                .build();
                        assignmentRepository.save(assignment);
                        log.info("Assignment added: {}", assignment);
                    }
                } else if(optionalAssignmentList.get().size() < amountDays){
                    log.info("{} has missing assignments", user.getUsername());
                    for(int i = 1; i<=amountDays; i++){
                        String day = String.format("%02d.%02d.%04d", i, month, year);
                        Optional<Assignment> optionalAssignment = assignmentRepository.findAssignmentByUserIdAndDate(user.getId(), day);
                        if(optionalAssignment.isEmpty()){
                            Assignment assignment = Assignment.builder()
                                    .projectId(0L)
                                    .projectAcronym("")
                                    .userId(user.getId())
                                    .userAcronym(user.getAcronym())
                                    .date(day)
                                    .color("")
                                    .build();
                            assignmentRepository.save(assignment);
                            log.info("Assignment added: {}", assignment);
                        }
                    }
                }
            }
        }
        //get All Assignments for date (MM.YYYY)
        Optional<List<Assignment>> assignments = assignmentRepository.findAssignmentsByDateContaining(date);
        return assignments.orElse(null);
    }

    @Transactional
    public Assignment updateAssignment(Assignment assignment) {
        Optional<Assignment> optionalAssignment = assignmentRepository.findById(assignment.getId());
        if(optionalAssignment.isPresent()){
            Assignment updatedAssignment = optionalAssignment.get();
            if(assignment.getProjectId() != 0){
                Optional<Project> optionalProject = projectRepository.findById(assignment.getProjectId());
                if(optionalProject.isPresent()){
                    Project project = optionalProject.get();
                    updatedAssignment.setColor(project.getColor());
                    updatedAssignment.setProjectAcronym(project.getAcronym());
                    updatedAssignment.setProjectId(assignment.getProjectId());
                }
            }else {
                updatedAssignment.setColor(assignment.getColor());
                updatedAssignment.setProjectAcronym(assignment.getProjectAcronym());
                updatedAssignment.setProjectId(assignment.getProjectId());
            }
            log.info("Assignment updated: {}", updatedAssignment);
            return updatedAssignment;
        }
        return null;
    }
}