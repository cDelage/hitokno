import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


function useFindFile() {
  const { fileId } = useParams() as { fileId: string };

  const { data: fileDetail, isLoading: isLoadingFile } = useQuery({
    queryKey: ["file", fileId],
    queryFn: () => window.repository.findFile(fileId),
  });

  return { fileDetail, isLoadingFile };
}

export default useFindFile;
