import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFile() {
  const queryClient = useQueryClient();

  const { isPending, mutate: createFile } = useMutation({
    mutationFn: (folderId : string) => window.repository.createFile(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repository"] });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { isPending, createFile };
}
