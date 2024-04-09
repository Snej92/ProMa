package org.sysprotec.restapi.model;


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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String startDate;
    private String endDate;
    private String item;
    @Enumerated(EnumType.STRING)
    private StatusLOP status;
    private String userAcronym;
}
