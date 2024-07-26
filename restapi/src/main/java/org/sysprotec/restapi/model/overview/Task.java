package org.sysprotec.restapi.model.overview;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.settings.TaskSetting;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"station"})
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TASK_ID_GEN")
    @SequenceGenerator(name = "TASK_ID_GEN", sequenceName = "TASK_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String dateDone;
    private String dateCommited;
    private String addition;
    private Boolean done;
    private Boolean commited;
    @ManyToOne
    @JoinColumn(name= "task_setting_id")
    private TaskSetting taskSetting;
    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;

    public void setDone(Boolean done) {
        this.done = done;
        if(this.done){
            if(this.dateDone != null){
                if(this.dateDone.isEmpty()){
                    this.dateDone = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
                }
            }
        } else {
            this.dateDone = "";
        }
    }

    public void setCommited(Boolean commited) {
        this.commited = commited;
        if(this.commited){
            if(this.dateCommited != null){
                if(this.dateCommited.isEmpty()){
                    this.dateCommited = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
                }
            }
        } else {
            this.dateCommited = "";
        }
    }
}
