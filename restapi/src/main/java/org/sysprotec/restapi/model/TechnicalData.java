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
public class TechnicalData {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TECHNICAL_DATA_ID_GEN")
    @SequenceGenerator(name = "TECHNICAL_DATA_ID_GEN", sequenceName = "TECHNICAL_DATA_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private String item;
    private Long value;
    private String unit;
}
