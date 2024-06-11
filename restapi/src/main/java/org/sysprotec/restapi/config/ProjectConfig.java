package org.sysprotec.restapi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.settings.LopSetting;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.repository.ProjectRepository;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class ProjectConfig {

    @Bean
    CommandLineRunner commandLineRunnerProject(ProjectRepository projectRepository) {

        Project testProject1 = Project.builder()
                .name("Test")
                .description("Project for testing http requests")
                .amountStations(1)
                .inProgressStations(1)
                .storedStations(0)
                .notStoredStations(0)
                .favorite(false)
                .build();

        Station station1 = Station.builder()
                .name("ST8010")
                .description("ZH onload")
                .favorite(true)
                .totalProgress(50)
                .issuer("BWA")
                .lopTotal(10)
                .lopDone(0)
                .lopToDo(10)
                .status(StatusEPLAN.AUSGELAGERT)
                .version("V1.0")
                .project(testProject1)
                .build();

        Station station2 = Station.builder()
                .name("ST8020")
                .description("ZH process 1")
                .favorite(false)
                .totalProgress(30)
                .issuer("AEL")
                .lopTotal(10)
                .lopDone(5)
                .lopToDo(5)
                .status(StatusEPLAN.EINGELAGERT)
                .version("V1.1")
                .project(testProject1)
                .build();

        Station station3 = Station.builder()
                .name("ST8040")
                .description("Presst")
                .favorite(false)
                .totalProgress(100)
                .issuer("AEL")
                .lopTotal(10)
                .lopDone(10)
                .lopToDo(0)
                .status(StatusEPLAN.INARBEIT)
                .version("V1.2")
                .project(testProject1)
                .build();

        Station station4 = Station.builder()
                .name("ST8050")
                .description("Presst und misst")
                .favorite(false)
                .totalProgress(800)
                .issuer("AEL")
                .lopTotal(10)
                .lopDone(10)
                .lopToDo(0)
                .status(StatusEPLAN.INARBEIT)
                .version("V1.2")
                .project(testProject1)
                .build();

        Station station5 = Station.builder()
                .name("ST8060")
                .description("Schraubt mit Hand was")
                .favorite(false)
                .totalProgress(100)
                .issuer("AEL")
                .lopTotal(10)
                .lopDone(10)
                .lopToDo(0)
                .status(StatusEPLAN.INARBEIT)
                .version("V1.2")
                .project(testProject1)
                .build();

        Station station6 = Station.builder()
                .name("ST8070")
                .description("Schraubt automatisch was")
                .favorite(false)
                .totalProgress(100)
                .issuer("AEL")
                .lopTotal(10)
                .lopDone(10)
                .lopToDo(0)
                .status(StatusEPLAN.INARBEIT)
                .version("V1.2")
                .project(testProject1)
                .build();

        Station station7 = Station.builder()
                .name("ST8080")
                .description("3 Handarbeitsplätze nebeneinander")
                .favorite(false)
                .totalProgress(100)
                .issuer("AEL")
                .lopTotal(10)
                .lopDone(10)
                .lopToDo(0)
                .status(StatusEPLAN.INARBEIT)
                .version("V1.2")
                .project(testProject1)
                .build();

        Station station8 = Station.builder()
                .name("ST8090")
                .description("Schraubt den camshaft fest")
                .favorite(false)
                .totalProgress(100)
                .issuer("AEL")
                .lopTotal(10)
                .lopDone(10)
                .lopToDo(0)
                .status(StatusEPLAN.INARBEIT)
                .version("V1.2")
                .project(testProject1)
                .build();

        Station station9 = Station.builder()
                .name("ST8100")
                .description("hab ich legit vergessen")
                .favorite(false)
                .totalProgress(100)
                .issuer("AEL")
                .lopTotal(10)
                .lopDone(10)
                .lopToDo(0)
                .status(StatusEPLAN.INARBEIT)
                .version("V1.2")
                .project(testProject1)
                .build();

        List<Station> stationList = new ArrayList<>();
        stationList.add(station1);
        stationList.add(station2);
        stationList.add(station3);
        stationList.add(station4);
        stationList.add(station5);
        stationList.add(station6);
        stationList.add(station7);
        stationList.add(station8);
        stationList.add(station9);

        testProject1.setStations(stationList);

        //Version
//        VersionStation versionStation1 = VersionStation.builder()
//                .done(false)
//                .stationName("ST8010")
//                .build();
//
//        VersionStation versionStation2 = VersionStation.builder()
//                .done(false)
//                .stationName("ST8020")
//                .build();
//
//        List<VersionStation> versionStationList1 = new ArrayList<>();
//        versionStationList1.add(versionStation1);
//        versionStationList1.add(versionStation2);
//
//        Version version1 = Version.builder()
//                .date("04.04.2024")
//                .done(false)
//                .toDo("http requests test")
//                .version("V1.0")
//                .versionStation(versionStationList1)
//                .build();
//
//        VersionStation versionStation21 = VersionStation.builder()
//                .done(false)
//                .stationName("ST8010")
//                .build();
//
//        VersionStation versionStation22 = VersionStation.builder()
//                .done(false)
//                .stationName("ST8020")
//                .build();
//
//        List<VersionStation> versionStationList2 = new ArrayList<>();
//        versionStationList2.add(versionStation21);
//        versionStationList2.add(versionStation22);
//
//        Version version2 = Version.builder()
//                .date("30.04.2024")
//                .done(false)
//                .toDo("NGRX lerning")
//                .version("V1.1")
//                .versionStation(versionStationList2)
//                .build();
//
//        List<Version> versionList = new ArrayList<>();
//        versionList.add(version1);
//        versionList.add(version2);

        LopSetting lop1 = LopSetting.builder()
                .startDate("01.04.2024")
                .item("LOP Punkt 1")
                .project(testProject1)
                .build();

        LopSetting lop2 = LopSetting.builder()
                .startDate("02.04.2024")
                .item("LOP Punkt 2")
                .project(testProject1)
                .build();

        LopSetting lop3 = LopSetting.builder()
                .startDate("03.04.2024")
                .item("LOP Punkt 3")
                .project(testProject1)
                .build();

        List<LopSetting> lopList = new ArrayList<>();
            lopList.add(lop1);
            lopList.add(lop2);
            lopList.add(lop3);

        testProject1.setLopSetting(lopList);
        //add new stuff above


        Project testProject2 = Project.builder()
                .name("Testing 2")
                .description("Project for testing frontend spacing")
                .amountStations(0)
                .inProgressStations(0)
                .storedStations(0)
                .notStoredStations(0)
                .favorite(false)
                .build();
        return args -> {
            projectRepository.save(testProject1);
            projectRepository.save(testProject2);
        };
    }
}
