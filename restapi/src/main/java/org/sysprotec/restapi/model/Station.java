package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sysprotec.restapi.model.overview.HeaderData;
import org.sysprotec.restapi.model.overview.Lop;
import org.sysprotec.restapi.model.overview.Task;
import org.sysprotec.restapi.model.overview.TechnicalData;
import org.sysprotec.restapi.model.types.StatusEPLAN;

import java.util.Iterator;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STATION_ID_GEN")
    @SequenceGenerator(name = "STATION_ID_GEN", sequenceName = "STATION_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;
    private String name;
    private String description;
    private String issuer;
    @Enumerated(EnumType.STRING)
    private StatusEPLAN status;
    private Integer totalProgress;
    private String version;
    //Progress
    //LOP
    private Integer lopTotal;
    private Integer lopDone;
    private Integer lopToDo;
    private Integer lopProgress;
    //Documentation
    private Integer documentationTotal;
    private Integer documentationDone;
    private Integer documentationToDo;
    private Integer documentationProgress;
    //Specification
    private Integer specificationTotal;
    private Integer specificationDone;
    private Integer specificationToDo;
    private Integer specificationProgress;
    //Control
    private Integer controlTotal;
    private Integer controlDone;
    private Integer controlToDo;
    private Integer controlProgress;
    //Tables
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "station")
    private List<History> history;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "station")
    private List<Lop> lop;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "station")
    private List<Task> documentation;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "station")
    private List<Task> control;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "station")
    private List<HeaderData> headerData;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "station")
    private List<Task> specification;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "station")
    private List<Task> projection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "station")
    private List<TechnicalData> technicalData;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;


    //History
    public void addHistory(History history){
        this.history.add(history);
    }

    public void removeHistory(Long historyId) {
        History history = this.history.stream().filter(t -> t.getId() == historyId).findFirst().orElse(null);
        if (history != null) {
            this.history.remove(history);
        }
    }

    //Lop
    public void addLop(Lop lop){
        this.lop.add(lop);
    }

    public void removeLop(Long lopSettingId) {
        if (lop != null) {
            lop.removeIf(lop -> {
                boolean match = lop.getLopSetting() != null && lop.getLopSetting().getId().equals(lopSettingId);
                if (match) {
                    lop.setStation(null);
                }
                return match;
            });
        }
    }

    //Documentation
    public void addDocumentation(Task documentation){
        this.documentation.add(documentation);
    }

    public void removeDocumentation(Long documentationSettingId) {
        if (documentation != null) {
            documentation.removeIf(task -> {
                boolean match = task.getTaskSetting() != null && task.getTaskSetting().getId().equals(documentationSettingId);
                if (match) {
                    task.setStation(null);
                }
                return match;
            });
        }
    }

    //Control
    public void addControl(Task control){
        this.control.add(control);
    }

    public void removeControl(Long controlSettingId) {
        if (control != null) {
            control.removeIf(task -> {
                boolean match = task.getTaskSetting() != null && task.getTaskSetting().getId().equals(controlSettingId);
                if (match) {
                    task.setStation(null);
                }
                return match;
            });
        }
    }

    //HeaderData
    public void addHeaderData(HeaderData headerData){
        this.headerData.add(headerData);
    }

    public void removeHeaderData(Long headerDataSettingId) {
        if (headerData != null) {
            headerData.removeIf(headerData -> {
                boolean match = headerData.getHeaderDataSetting() != null && headerData.getHeaderDataSetting().getId().equals(headerDataSettingId);
                if (match) {
                    headerData.setStation(null);
                }
                return match;
            });
        }
    }

    //Specification
    public void addSpecification(Task specification){
        this.specification.add(specification);
    }

    public void removeSpecification(Long specificationSettingId) {
        if (specification != null) {
            specification.removeIf(task -> {
                boolean match = task.getTaskSetting() != null && task.getTaskSetting().getId().equals(specificationSettingId);
                if (match) {
                    task.setStation(null);
                }
                return match;
            });
        }
    }

    //Projection
    public void addProjection(Task projection){
        this.projection.add(projection);
    }

    public void removeProjection(Long projectionSettingId) {
        if (projection != null) {
            projection.removeIf(task -> {
                boolean match = task.getTaskSetting() != null && task.getTaskSetting().getId().equals(projectionSettingId);
                if (match) {
                    task.setStation(null);
                }
                return match;
            });
        }
    }

    //TechnicalData
    public void addTechnicalData(TechnicalData technicalData){
        this.technicalData.add(technicalData);
    }

    public void removeTechnicalData(Long technicalDataSettingId) {
        if (technicalData != null) {
            technicalData.removeIf(technicalData -> {
                boolean match = technicalData.getTechnicalDataSetting() != null && technicalData.getTechnicalDataSetting().getId().equals(technicalDataSettingId);
                if (match) {
                    technicalData.setStation(null);
                }
                return match;
            });
        }
    }
}
