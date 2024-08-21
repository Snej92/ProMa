package org.sysprotec.restapi.model.projections;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeaderDataInput {
    private String item;
    private String data;
}
