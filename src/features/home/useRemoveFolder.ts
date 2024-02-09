import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveFolder() {
    const queryClient = useQueryClient();

  const { isPending: isPendingRemoveFolder, mutate: removeFolder } = useMutation({
    mutationFn: (folderId : string) => window.repository.removeFolder(folderId),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["repository"]})
    },
    onError: (err) => {
        console.log(err)
    },
  });

  return { isPendingRemoveFolder, removeFolder };
}
