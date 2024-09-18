package org.sysprotec.restapi.model.settings;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.project.Project;
import org.sysprotec.restapi.model.overview.TechnicalData;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"project","technicalData"})
public class TechnicalDataSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TECHNICAL_DATA_SETTING_ID_GEN")
    @SequenceGenerator(name = "TECHNICAL_DATA_SETTING_ID_GEN", sequenceName = "TECHNICAL_DATA_SETTING_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String item;
    private String unit;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @OneToMany(mappedBy = "technicalDataSetting")
    private List<TechnicalData> technicalData;
}
