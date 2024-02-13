import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useFindFile() {
    const [searchParams] = useSearchParams();

    const fileId = searchParams.get("selected") as string;

    const {data: file, isLoading: isLoadingFile} = useQuery({
        queryKey: ["file"],
        queryFn: () => {
            window.repository.findFile({fileId});
        }
    });

    return {file, isLoadingFile}
}

export default useFindFile;
