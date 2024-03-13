import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useImportFile() {
  const queryClient = useQueryClient();
  
  const { mutate: importFile, isPending: isImportFile } = useMutation({
    mutationFn: window.repository.importFile,
    onError: (err) => {
      console.log(err);
    },
    onSuccess : () => {
        queryClient.invalidateQueries({
            queryKey: ["repository"]
        })
    }
  });

  return { importFile, isImportFile };
}
