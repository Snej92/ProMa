package org.sysprotec.restapi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.repository.ProjectRepository;

import java.util.ArrayList;
import java.util.List;

//@Configuration
//public class ProjectConfig {
//
//    @Bean
//    CommandLineRunner commandLineRunnerProject(ProjectRepository projectRepository) {
//
//        Project testProject1 = Project.builder()
//                .name("Test")
//                .description("Project for testing http requests")
//                .amountStations(1)
//                .inProgressStations(1)
//                .storedStations(0)
//                .notStoredStations(0)
//                .build();
//
//        Station station1 = Station.builder()
//                .name("ST8010")
//                .description("ZH onload")
//                .totalProgress(50)
//                .issuer("BWA")
//                .lopTotal(10)
//                .lopDone(0)
//                .lopToDo(10)
//                .documentationTotal(10)
//                .documentationToDo(7)
//                .documentationDone(3)
//                .documentationProgress(100)
//                .status(StatusEPLAN.AUSGELAGERT)
//                .version("V1.0")
//                .project(testProject1)
//                .build();
//
//        Station station2 = Station.builder()
//                .name("ST8020")
//                .description("ZH process 1")
//                .totalProgress(30)
//                .issuer("AEL")
//                .lopTotal(10)
//                .lopDone(5)
//                .lopToDo(5)
//                .status(StatusEPLAN.EINGELAGERT)
//                .version("V1.1")
//                .project(testProject1)
//                .build();
//
//        Station station3 = Station.builder()
//                .name("ST8040")
//                .description("Presst")
//                .totalProgress(100)
//                .issuer("AEL")
//                .lopTotal(10)
//                .lopDone(10)
//                .lopToDo(0)
//                .status(StatusEPLAN.INARBEIT)
//                .version("V1.2")
//                .project(testProject1)
//                .build();
//
//        Station station4 = Station.builder()
//                .name("ST8050")
//                .description("Presst und misst")
//                .totalProgress(100)
//                .issuer("AEL")
//                .lopTotal(10)
//                .lopDone(10)
//                .lopToDo(0)
//                .status(StatusEPLAN.INARBEIT)
//                .version("V1.2")
//                .project(testProject1)
//                .build();
//
//        Station station5 = Station.builder()
//                .name("ST8060")
//                .description("Schraubt mit Hand was")
//                .totalProgress(100)
//                .issuer("AEL")
//                .lopTotal(10)
//                .lopDone(10)
//                .lopToDo(0)
//                .status(StatusEPLAN.INARBEIT)
//                .version("V1.2")
//                .project(testProject1)
//                .build();
//
//        Station station6 = Station.builder()
//                .name("ST8070")
//                .description("Schraubt automatisch was")
//                .totalProgress(100)
//                .issuer("AEL")
//                .lopTotal(10)
//                .lopDone(10)
//                .lopToDo(0)
//                .status(StatusEPLAN.INARBEIT)
//                .version("V1.2")
//                .project(testProject1)
//                .build();
//
//        Station station7 = Station.builder()
//                .name("ST8080")
//                .description("3 Handarbeitsplätze nebeneinander")
//                .totalProgress(100)
//                .issuer("AEL")
//                .lopTotal(10)
//                .lopDone(10)
//                .lopToDo(0)
//                .status(StatusEPLAN.INARBEIT)
//                .version("V1.2")
//                .project(testProject1)
//                .build();
//
//        Station station8 = Station.builder()
//                .name("ST8090")
//                .description("Schraubt den camshaft fest")
//                .totalProgress(100)
//                .issuer("AEL")
//                .lopTotal(10)
//                .lopDone(10)
//                .lopToDo(0)
//                .status(StatusEPLAN.INARBEIT)
//                .version("V1.2")
//                .project(testProject1)
//                .build();
//
//        Station station9 = Station.builder()
//                .name("ST8100")
//                .description("hab ich legit vergessen")
//                .totalProgress(100)
//                .issuer("AEL")
//                .lopTotal(10)
//                .lopDone(10)
//                .lopToDo(0)
//                .status(StatusEPLAN.INARBEIT)
//                .version("V1.2")
//                .project(testProject1)
//                .build();
//
//        List<Station> stationList = new ArrayList<>();
//        stationList.add(station1);
//        stationList.add(station2);
//        stationList.add(station3);
//        stationList.add(station4);
//        stationList.add(station5);
//        stationList.add(station6);
//        stationList.add(station7);
//        stationList.add(station8);
//        stationList.add(station9);
//
//        testProject1.setStations(stationList);
//
//        Project testProject2 = Project.builder()
//                .name("Testing 2")
//                .description("Project for testing frontend spacing")
//                .amountStations(0)
//                .inProgressStations(0)
//                .storedStations(0)
//                .notStoredStations(0)
//                .build();
//
//        if(projectRepository.findProjectByNameIgnoreCase("Test") == null){
//            projectRepository.save(testProject1);
//        }
//        if(projectRepository.findProjectByNameIgnoreCase("Testing 2") == null){
//            projectRepository.save(testProject2);
//        }
//
//        return args -> {
//            projectRepository.findProjectByNameIgnoreCase("Test");
//            projectRepository.findProjectByNameIgnoreCase("Testing 2");
//        };
//    }
//}
