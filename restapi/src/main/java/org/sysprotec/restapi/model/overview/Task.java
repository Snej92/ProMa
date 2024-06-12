package org.sysprotec.restapi.model.overview;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.settings.LopSetting;
import org.sysprotec.restapi.model.settings.TaskSetting;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"station"})
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TASK_ID_GEN")
    @SequenceGenerator(name = "TASK_ID_GEN", sequenceName = "TASK_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    @ManyToOne
    @JoinColumn(name= "task_setting_id")
    private TaskSetting taskSetting;
    private String date;
    private String addition;
    private Boolean done;
    private Boolean commit;
    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;
}
