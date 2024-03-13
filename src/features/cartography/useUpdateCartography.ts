import { useMutation } from "@tanstack/react-query";
import { FileHitokno } from "../../types/Repository.types";

export function useUpdateCartography() {
  const { mutate: updateCartography, isPending: isUpdateCartographyPending } =
    useMutation({
      mutationFn: (file: FileHitokno) =>
        window.repository.updateCartography(file),
      onSuccess: () => {},
      onError: (err) => {
        console.log(err);
      },
    });

  return { updateCartography, isUpdateCartographyPending };
}
