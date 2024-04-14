import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateMiniature() {
  const queryClient = useQueryClient();
  const { mutate: updateMiniature, isPending: isUpdatingMiniature } =
    useMutation({
      mutationFn: window.repository.updateMiniature,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["repository"], exact: false });
        queryClient.invalidateQueries({ queryKey: ["file"] , exact: false});
      },
      onError: (err) => {
        console.log(err);
      },
    });

  return {
    updateMiniature,
    isUpdatingMiniature,
  };
}

export default useUpdateMiniature;
