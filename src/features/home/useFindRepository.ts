import { useQuery } from "@tanstack/react-query";

export function useFindRepository(){
    const {isLoading: isRepositoryLoading, data : repository, error} = useQuery({
        queryKey: ["repository"],
        queryFn: window.repository.findRepository
    })

    if(error){
        throw new Error(error.message)
    }

    return {isRepositoryLoading, repository}
}