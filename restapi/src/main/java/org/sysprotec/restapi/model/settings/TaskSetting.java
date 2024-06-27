package org.sysprotec.restapi.model.settings;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.Project;
import org.sysprotec.restapi.model.overview.Task;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"project", "task"})
public class TaskSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TASK_SETTING_ID_GEN")
    @SequenceGenerator(name = "TASK_SETTING_ID_GEN", sequenceName = "TASK_SETTING_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String name;
    private String type;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @OneToMany(mappedBy = "taskSetting")
    private List<Task> task;
}
