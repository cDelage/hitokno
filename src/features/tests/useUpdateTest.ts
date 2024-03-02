import { useMutation } from "@tanstack/react-query";

function useUpdateTest() {
  const { mutate: updateTest, isPending: isUpdatingTest } = useMutation({
    mutationFn: window.tests.updateTest,
    onError: (err: Error) => {
      console.log("Fail to update test", err);
    },
  });

  return { updateTest, isUpdatingTest };
}

export default useUpdateTest;
