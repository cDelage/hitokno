import { useQuery } from "@tanstack/react-query";

export function useFindFileById(id: string) {
  const { data: fileDetail, isLoading: isFileLoading } = useQuery({
    queryKey: ["file", id],
    queryFn: () => window.repository.findFile(id),
  });

  return { fileDetail, isFileLoading };
}
