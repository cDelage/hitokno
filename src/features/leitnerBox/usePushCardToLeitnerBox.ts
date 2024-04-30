import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePushCardToLeitnerBox() {
  const queryClient = useQueryClient();
  const { mutate: pushCardToLeitnerBox, isPending: isPushToLeitnerBox } =
    useMutation({
      mutationFn: window.leitnerbox.pushCardToLeitnerBox,
      onError: (err) => {
        console.error(err);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["leitnerbox"]
        })
      }
    });

  return { pushCardToLeitnerBox, isPushToLeitnerBox };
}
