package org.sysprotec.restapi.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"station"})
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HISTORY_ID_GEN")
    @SequenceGenerator(name = "HISTORY_ID_GEN", sequenceName = "HISTORY_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Integer id;
    private String date;
    private String item;
    private String userAcronym;
    private String filename;
    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;
}
