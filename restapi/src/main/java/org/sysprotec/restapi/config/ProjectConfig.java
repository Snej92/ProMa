package org.sysprotec.restapi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.Version;
import org.sysprotec.restapi.model.VersionStation;
import org.sysprotec.restapi.model.types.StatusEPLAN;
import org.sysprotec.restapi.repository.ProjectRepository;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class ProjectConfig {

    @Bean
    CommandLineRunner commandLineRunnerSkills(ProjectRepository projectRepository) {

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

        List<VersionStation> versionStationList = new ArrayList<>();
        versionStationList.add(versionStation1);
        versionStationList.add(versionStation2);

        Version version1 = Version.builder()
                .date("04.04.2024")
                .done(false)
                .toDo("http requests test")
                .version("V1.0")
                .versionStation(versionStationList)
                .build();

        List<Version> versionList = new ArrayList<>();
        versionList.add(version1);


        //add new stuff above
        Project testProject = Project.builder()
                .name("Test")
                .description("Project for testing http requests")
                .versions(versionList)
                .stations(stationList)
                .favorite(false)
                .build();
        return args -> {
            projectRepository.save(testProject);
        };
    }
}
