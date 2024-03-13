import { useMutation } from "@tanstack/react-query";

export function useSaveFile(){
    const {mutate: saveFile, isPending: isSavingFile} = useMutation({
        mutationFn: window.repository.saveFile,
        onError : (err) => {
            console.log(err)
        }
    })

    return {saveFile, isSavingFile}
}

