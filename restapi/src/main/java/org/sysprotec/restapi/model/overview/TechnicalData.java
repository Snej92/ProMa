package org.sysprotec.restapi.model.overview;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.settings.TechnicalDataSetting;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"station"})
public class TechnicalData {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TECHNICAL_DATA_ID_GEN")
    @SequenceGenerator(name = "TECHNICAL_DATA_ID_GEN", sequenceName = "TECHNICAL_DATA_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String value;
    @ManyToOne
    @JoinColumn(name= "technical_data_setting_id")
    private TechnicalDataSetting technicalDataSetting;
    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;
}
