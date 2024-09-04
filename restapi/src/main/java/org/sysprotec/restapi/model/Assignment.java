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
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ASSIGNMENT_ID_GEN")
    @SequenceGenerator(name = "ASSIGNMENT_ID_GEN", sequenceName = "ASSIGNMENT_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;

    private Long projectId;
    private String projectAcronym;
    private Long userId;
    private String userAcronym;
    private String date;
    private String color;
}
