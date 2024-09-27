package org.sysprotec.restapi.specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.sysprotec.restapi.model.Station;
import org.sysprotec.restapi.model.types.StatusEPLAN;

import java.util.ArrayList;
import java.util.List;

public class StationSpecification {

    public static Specification<Station> filterByNameAndIssuerNameAndStatusAndVersionContaining(
            List<String> name, List<String> issuerName, List<StatusEPLAN> status, List<String> version, Long projectId,
            Integer minTotalProgress, Integer maxTotalProgress, Integer minLopProgress, Integer maxLopProgress){
        return (Root<Station> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
          List<Predicate> predicates = new ArrayList<>();

          //Filter by name
          if(name != null && !name.isEmpty()){
              predicates.add(root.get("name").in(name));
          }

          //Filter by issuerName
          if(issuerName != null && !issuerName.isEmpty()){
              predicates.add(root.get("issuerName").in(issuerName));
          }

          //Filter by status
          if(status != null && !status.isEmpty()){
              predicates.add(root.get("status").in(status));
          }

          //Filter by version
          if(version != null && !version.isEmpty()){
              predicates.add(root.get("version").in(version));
          }

          //Filter by projectId
          if (projectId != null) {
              predicates.add(builder.equal(root.get("project").get("id"), projectId));
          }

            // Filter by totalProgress range (min - max)
            if (minTotalProgress != null && maxTotalProgress != null) {
                predicates.add(builder.between(root.get("totalProgress"), minTotalProgress, maxTotalProgress));
            } else if (minTotalProgress != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("totalProgress"), minTotalProgress));
            } else if (maxTotalProgress != null) {
                predicates.add(builder.lessThanOrEqualTo(root.get("totalProgress"), maxTotalProgress));
            }

            // Filter by lopProgress range (min - max)
            if (minLopProgress != null && maxLopProgress != null) {
                predicates.add(builder.between(root.get("lopProgress"), minLopProgress, maxLopProgress));
            } else if (minLopProgress != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("lopProgress"), minLopProgress));
            } else if (maxLopProgress != null) {
                predicates.add(builder.lessThanOrEqualTo(root.get("lopProgress"), maxLopProgress));
            }

          return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
