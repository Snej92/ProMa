package org.sysprotec.restapi.model.settings;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.overview.HeaderData;
import org.sysprotec.restapi.model.types.SettingType;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"project", "headerData"})
public class HeaderDataSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HEADER_SETTING_ID_GEN")
    @SequenceGenerator(name = "HEADER_SETTING_ID_GEN", sequenceName = "HEADER_SETTING_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String item;
    @Enumerated(EnumType.STRING)
    private SettingType type;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @OneToMany(mappedBy = "headerDataSetting")
    private List<HeaderData> headerData;
}
