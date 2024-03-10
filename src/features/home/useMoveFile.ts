import { useMutation } from "@tanstack/react-query";

export default function useMoveFile() {
  const { mutate: moveFile, isPending: isMovingFile } = useMutation({
    mutationFn: window.repository.moveFile,
    onError: (err) => {
      console.log(err);
    },
  });

  return { moveFile, isMovingFile };
}
