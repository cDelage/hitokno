import { useMutation } from "@tanstack/react-query";
import { FileHitokno } from "../../types/Repository.types";

export function useUpdateDeck() {
  const { isPending: isUpdatingDeck, mutate: updateDeck } = useMutation({
    mutationFn: (file: FileHitokno) => window.repository.updateDeck(file),
    onError: (err: Error) => {
      console.log(err);
    },
  });

  return { isUpdatingDeck, updateDeck };
}
