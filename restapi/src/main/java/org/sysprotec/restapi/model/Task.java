package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TASK_ID_GEN")
    @SequenceGenerator(name = "TASK_ID_GEN", sequenceName = "TASK_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private String name;
    private String date;
    private String addition;
    private Boolean done;
}
