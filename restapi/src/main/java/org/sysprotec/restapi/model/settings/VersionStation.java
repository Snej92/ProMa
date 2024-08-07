package org.sysprotec.restapi.model.settings;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties({"version"})
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VersionStation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "VERSION_STATION_ID_GEN")
    @SequenceGenerator(name = "VERSION_STATION_ID_GEN", sequenceName = "VERSION_STATION_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String stationName;

    //1 = open
    //2 = done
    //3 = not needed
    @Min(1)
    @Max(3)
    private Integer state;
    @ManyToOne
    @JoinColumn(name = "version_id")
    private Version version;
}