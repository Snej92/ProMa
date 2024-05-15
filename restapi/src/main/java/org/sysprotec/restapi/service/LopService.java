package org.sysprotec.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.repository.LopRepository;
import org.sysprotec.restapi.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class LopService {

    private final LopRepository lopRepository;
    private final ProjectRepository projectRepository;
    public static Integer PROJECT_ID = 1;

    public List<Lop> getLop() {
        log.info("Fetch all LOPs");
        Optional<Project> optionalProject = projectRepository.findProjectById(PROJECT_ID);
        if(optionalProject.isPresent()){
            return optionalProject.get().getLop();
        }else log.error("Project with ID" + PROJECT_ID +" does not exist in database");
        return null;
    }

    public Lop addLop(Lop lop) {
        Optional<Project> optionalProject = projectRepository.findProjectById(PROJECT_ID);
        if(optionalProject.isEmpty()){
            log.error("Project with id "+ PROJECT_ID + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            saveProject.addLop(lop);
            projectRepository.save(saveProject);
            log.info("LOP Punkt: '" + lop.getItem() + "' zu '" + saveProject.getName() + "' Projekt hinzugefügt");
            return lopRepository.findTopByOrderByIdDesc();
        }
        return null;
    }

    @Transactional
    public void updateLop(Lop lop) {
        Optional<Lop> optionalLop = lopRepository.findLopById(lop.getId());
        if(optionalLop.isEmpty()){
            log.error("LOP with id "+ lop.getId() + " does not exist in database");
        } else {
            Lop saveLop = optionalLop.get();
            saveLop.setItem(lop.getItem());
            saveLop.setStatus(lop.getStatus());
            saveLop.setEndDate(lop.getEndDate());
            saveLop.setStartDate(lop.getStartDate());
            saveLop.setUserAcronym(lop.getUserAcronym());
        }
    }

    public void delete(Integer lopId) {
        Optional<Lop> optionalLop = lopRepository.findLopById(lopId);
        Optional<Project> optionalProject = projectRepository.findProjectByLopId(lopId);
        if(optionalLop.isEmpty() || optionalProject.isEmpty()){
            log.error("LOP with id "+ lopId + " does not exist in database");
        } else {
            Project saveProject = optionalProject.get();
            saveProject.removeLop(lopId);
            lopRepository.deleteById(lopId);
        }
    }
}
