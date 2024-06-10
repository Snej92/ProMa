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
public class HeaderData {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HEADER_ID_GEN")
    @SequenceGenerator(name = "HEADER_ID_GEN", sequenceName = "HEADER_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private String item;
    private String data;
}
