package org.sysprotec.restapi.model.overview;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.types.StatusLOP;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lop {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LOP_ID_GEN")
    @SequenceGenerator(name = "LOP_ID_GEN", sequenceName = "LOP_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private String startDate;
    private String endDate;
    private String item;
    @Enumerated(EnumType.STRING)
    private StatusLOP status;
    private String userAcronym;
}
