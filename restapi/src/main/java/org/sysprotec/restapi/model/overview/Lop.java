package org.sysprotec.restapi.model.overview;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.User;
import org.sysprotec.restapi.model.types.StatusLOP;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"station"})
public class Lop {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LOP_ID_GEN")
    @SequenceGenerator(name = "LOP_ID_GEN", sequenceName = "LOP_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String startDate;
    private String issuer;
    private String transmissionType;
    private String item;
    private String addition;
    private String endDate;
    @Enumerated(EnumType.STRING)
    private StatusLOP status;
    private String userAcronym;
    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;

    public void setStatus(StatusLOP status, User loggedUser) {
        this.status = status;
        if(status == StatusLOP.ERLEDIGT) {
            this.endDate = ZonedDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
            this.userAcronym = loggedUser.getAcronym();
        } else if(endDate != null){
            if(endDate.isEmpty()){
                this.endDate = "";
                this.userAcronym = "";
            }
        }
    }
}
