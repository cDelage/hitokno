import { useQuery } from "@tanstack/react-query";

function useFindTestById(testId: string) {
  const { data: testData, isLoading: isLoadingTest } = useQuery({
    queryKey: ["test", testId],
    queryFn: () => window.tests.findTestById({ _id: testId }),
  });

  return { testData, isLoadingTest };
}

export default useFindTestById;
