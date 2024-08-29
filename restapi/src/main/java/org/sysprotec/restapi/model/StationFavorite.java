package org.sysprotec.restapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "station_favorites")
public class StationFavorite {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STATION_FAVORITE_ID_GEN")
    @SequenceGenerator(name = "STATION_FAVORITE_ID_GEN", sequenceName = "STATION_FAVORITE_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;

    private Long userId;
    private Long stationId;
}
