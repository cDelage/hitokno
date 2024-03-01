import { useMutation } from "@tanstack/react-query";
import { File } from "../../types/Repository.types";

export function useUpdateDeck() {
  const { isPending: isUpdatingDeck, mutate: updateDeck } = useMutation({
    mutationFn: (file: File) => window.repository.updateDeck(file),
    onError: (err: Error) => {
      console.log(err);
    },
  });

  return { isUpdatingDeck, updateDeck };
}
