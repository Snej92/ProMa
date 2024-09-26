package org.sysprotec.restapi.model.search.filter;

import lombok.*;
import org.sysprotec.restapi.model.types.StatusEPLAN;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StationFilter {
    private List<String> name;
    private List<String> issuerName;
    private List<StatusEPLAN> status;
    private List<String> version;

    private Integer minTotalProgress;
    private Integer maxTotalProgress;

    private Integer minLopProgress;
    private Integer maxLopProgress;
}
