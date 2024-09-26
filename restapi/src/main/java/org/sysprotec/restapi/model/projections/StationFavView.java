package org.sysprotec.restapi.model.projections;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StationFavView {
    private StationView station;
    private Boolean isFavorite;
}
