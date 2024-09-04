package org.sysprotec.restapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.sysprotec.restapi.model.Assignment;
import org.sysprotec.restapi.service.AssignmentService;

import java.util.List;

@RestController
@RequestMapping("/api/assignment")
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;

    @GetMapping("{date}")
    public List<Assignment> getAssignment(
            @PathVariable String date){
        return assignmentService.getAssignment(date);
    }

    @PutMapping()
    public Assignment updateAssignment(
            @RequestBody Assignment assignment){
        return assignmentService.updateAssignment(assignment);
    }
}
