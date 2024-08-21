package org.sysprotec.restapi.model.projections;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StationRequest {
    private StationDto stationDto;
    private List<HeaderDataInput> headerDataInput;
}
