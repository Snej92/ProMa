package org.sysprotec.restapi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.sysprotec.restapi.model.*;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.model.types.StatusLOP;
import org.sysprotec.restapi.repository.ProjectRepository;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class ProjectConfig {

    @Bean
    CommandLineRunner commandLineRunnerProject(ProjectRepository projectRepository) {

        Station station1 = Station.builder()
                .name("ST8010")
                .description("ZH onload")
                .favorite(true)
                .progress(50)
                .issuer("BWA")
                .status(StatusEPLAN.INARBEIT)
                .build();

        Station station2 = Station.builder()
                .name("ST8020")
                .description("ZH process 1")
                .favorite(true)
                .progress(30)
                .issuer("AEL")
                .status(StatusEPLAN.INARBEIT)
                .build();

        List<Station> stationList = new ArrayList<>();
        stationList.add(station1);
        stationList.add(station2);

        VersionStation versionStation1 = VersionStation.builder()
                .done(false)
                .stationName("ST8010")
                .build();

        VersionStation versionStation2 = VersionStation.builder()
                .done(false)
                .stationName("ST8020")
                .build();

        List<VersionStation> versionStationList1 = new ArrayList<>();
        versionStationList1.add(versionStation1);
        versionStationList1.add(versionStation2);

        Version version1 = Version.builder()
                .date("04.04.2024")
                .done(false)
                .toDo("http requests test")
                .version("V1.0")
                .versionStation(versionStationList1)
                .build();

        VersionStation versionStation21 = VersionStation.builder()
                .done(false)
                .stationName("ST8010")
                .build();

        VersionStation versionStation22 = VersionStation.builder()
                .done(false)
                .stationName("ST8020")
                .build();

        List<VersionStation> versionStationList2 = new ArrayList<>();
        versionStationList2.add(versionStation21);
        versionStationList2.add(versionStation22);

        Version version2 = Version.builder()
                .date("30.04.2024")
                .done(false)
                .toDo("NGRX lerning")
                .version("V1.1")
                .versionStation(versionStationList2)
                .build();

        List<Version> versionList = new ArrayList<>();
        versionList.add(version1);
        versionList.add(version2);

        Lop lop1 = Lop.builder()
                .startDate("01.04.2024")
                .endDate("27.04.2024")
                .item("LOP Punkt 1")
                .status(StatusLOP.ERLEDIGT)
                .userAcronym("AEL")
                .build();

        Lop lop2 = Lop.builder()
                .startDate("02.04.2024")
                .endDate("28.04.2024")
                .item("LOP Punkt 2")
                .status(StatusLOP.OFFEN)
                .userAcronym("BWA")
                .build();

        Lop lop3 = Lop.builder()
                .startDate("03.04.2024")
                .endDate("9.04.2024")
                .item("LOP Punkt 3")
                .status(StatusLOP.INARBEIT)
                .userAcronym("DBI")
                .build();

        List<Lop> lopList = new ArrayList<>();
            lopList.add(lop1);
            lopList.add(lop2);
            lopList.add(lop3);


        //add new stuff above
        Project testProject = Project.builder()
                .name("Test")
                .description("Project for testing http requests")
                .versions(versionList)
                .stations(stationList)
                .lop(lopList)
                .favorite(false)
                .build();
        return args -> {
            projectRepository.save(testProject);
        };
    }
}
