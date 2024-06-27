package org.sysprotec.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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
    private Boolean done;
    @ManyToOne
    @JoinColumn(name = "version_id")
    private Version version;
}