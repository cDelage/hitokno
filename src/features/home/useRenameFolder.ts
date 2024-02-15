import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RenameFolderParams } from "../../types/Repository.types";

export function useRenameFolder() {
  const queryClient = useQueryClient();

  const { isPending: isRenamePending, mutate: renameFolder } = useMutation({
    mutationFn: (params: RenameFolderParams) =>
      window.repository.renameFolder(params),
    onError: (err) => {
      console.log("Fail to rename folder : ", err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repository"] });
      queryClient.invalidateQueries({ queryKey: ["file"] });
    },
  });

  return { isRenamePending, renameFolder };
}
