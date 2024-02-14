import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRenameFile() {
  const queryClient = useQueryClient();

  const { isPending: isRenameFilePending, mutate: renameFile } = useMutation({
    mutationFn: window.repository.renameFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["repository"],
      });
      queryClient.invalidateQueries({
        queryKey: ["file"],
      });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { isRenameFilePending, renameFile };
}
