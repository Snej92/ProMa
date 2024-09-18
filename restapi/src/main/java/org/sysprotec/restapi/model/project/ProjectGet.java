package org.sysprotec.restapi.model.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectGet {
    private Boolean archived;
    private Boolean all;
}
