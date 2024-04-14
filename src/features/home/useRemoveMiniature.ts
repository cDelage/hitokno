import { useMutation, useQueryClient } from "@tanstack/react-query";

function useRemoveMiniature() {
  const queryClient = useQueryClient();
  const { mutate: removeMiniature, isPending: isRemovingMiniature } =
    useMutation({
      mutationFn: window.repository.removeMiniature,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["repository"],
          exact: false,
        });
        queryClient.invalidateQueries({ queryKey: ["file"], exact: false });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return { removeMiniature, isRemovingMiniature };
}

export default useRemoveMiniature;
