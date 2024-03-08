import { useQuery } from "@tanstack/react-query";
import { SearchCriterias } from "../../types/SearchCriteria.type";

function useFindTestsByCriterias(searchCriterias: SearchCriterias) {
  const { data: testsByCriteria, isLoading: isTestsByCriteriasLoading } =
    useQuery({
      queryKey: ["testsCriterias", searchCriterias.criteria, searchCriterias.pageNumber],
      queryFn: () => window.tests.findTestByCriterias(searchCriterias),
    });

  return { testsByCriteria, isTestsByCriteriasLoading };
}

export default useFindTestsByCriterias;
