import { useMutation } from "@tanstack/react-query";

function useDeleteFile(){
    const {mutate: deleteFile, isPending : isDeletingFile} = useMutation({
        mutationFn: window.repository.removeFile,
        onError: (err) => {
            console.log(err)
        }
    })

    return {
        deleteFile,
        isDeletingFile
    }
}

export default useDeleteFile;