package org.sysprotec.restapi.model.settings;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jboss.resteasy.spi.touri.MappedBy;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.overview.Lop;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"project", "lop"})
public class LopSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LOP_SETTINGS_ID_GEN")
    @SequenceGenerator(name = "LOP_SETTINGS_ID_GEN", sequenceName = "LOP_SETTINGS_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String startDate;
    private String item;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @OneToMany(mappedBy = "lopSetting")
    private List<Lop> lop;
}
