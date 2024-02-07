import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFolder() {
  const queryClient = useQueryClient();

  const { isPending, mutate: createFolder } = useMutation({
    mutationFn: window.repository.createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["repository"],
      });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { isPending, createFolder };
}
