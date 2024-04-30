import { useQuery } from "@tanstack/react-query";

export function useLeitnerBox() {
  const { data: leitnerBox, isLoading: isLoadingLeitnerBox } = useQuery({
    queryKey: ["leitnerbox"],
    queryFn: window.leitnerbox.getLeitnerBox,
  });

  return { leitnerBox, isLoadingLeitnerBox };
}
