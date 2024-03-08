import { useMutation } from "@tanstack/react-query"

function useDeleteTest(){
    const {mutate: deleteTest, isPending : isDeletingTest} = useMutation({
        mutationFn: window.tests.deleteTest,
        onError : (err) => {
            console.log(err)
        },
    })

    return {deleteTest, isDeletingTest}
}

export default useDeleteTest