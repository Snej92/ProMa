package org.sysprotec.restapi.model.overview;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.settings.HeaderDataSetting;
import org.sysprotec.restapi.model.settings.LopSetting;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"station"})
public class HeaderData {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HEADER_ID_GEN")
    @SequenceGenerator(name = "HEADER_ID_GEN", sequenceName = "HEADER_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String data;
    @ManyToOne
    @JoinColumn(name= "header_data_setting_id")
    private HeaderDataSetting headerDataSetting;
    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;
}
