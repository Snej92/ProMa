package org.sysprotec.restapi.model.settings;


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
public class LopSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LOP_SETTINGS_ID_GEN")
    @SequenceGenerator(name = "LOP_SETTINGS_ID_GEN", sequenceName = "LOP_SETTINGS_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private String startDate;
    private String item;
}
