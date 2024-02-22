import { useMutation } from "@tanstack/react-query";
import { File } from "../../types/Repository.types";

export function useUpdateCartography() {
  const { mutate: updateCartography, isPending: isUpdateCartographyPending } =
    useMutation({
      mutationFn: (file: File) =>
        window.repository.updateCartography(file),
      onSuccess: () => {},
      onError: (err) => {
        console.log(err);
      },
    });

  return { updateCartography, isUpdateCartographyPending };
}
