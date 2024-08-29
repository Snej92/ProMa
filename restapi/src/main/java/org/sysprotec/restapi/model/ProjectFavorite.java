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
@Table(name = "project_favorites")
public class ProjectFavorite {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROJECT_FAVORITE_ID_GEN")
    @SequenceGenerator(name = "PROJECT_FAVORITE_ID_GEN", sequenceName = "PROJECT_FAVORITE_ID_SEQ", initialValue = 1, allocationSize = 1)
    private Long id;

    private Long userId;
    private Long projectId;
}
