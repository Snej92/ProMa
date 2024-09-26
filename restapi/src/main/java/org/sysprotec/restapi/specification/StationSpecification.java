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
            List<String> name, List<String> issuerName, List<StatusEPLAN> status, List<String> version, Long projectId){
        return (Root<Station> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
          List<Predicate> predicates = new ArrayList<>();

          if(name != null && !name.isEmpty()){
              predicates.add(root.get("name").in(name));
          }

          if(issuerName != null && !issuerName.isEmpty()){
              predicates.add(root.get("issuerName").in(issuerName));
          }

          if(status != null && !status.isEmpty()){
              predicates.add(root.get("status").in(status));
          }

          if(version != null && !version.isEmpty()){
              predicates.add(root.get("version").in(version));
          }

            if (projectId != null) {
                predicates.add(builder.equal(root.get("project").get("id"), projectId));
            }

          return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
