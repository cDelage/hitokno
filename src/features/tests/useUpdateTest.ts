import { useMutation } from "@tanstack/react-query";

function useUpdateTest() {
  const { mutate: updateTestDatabase, isPending: isUpdatingTest } = useMutation({
    mutationFn: window.tests.updateTest,
    onError: (err: Error) => {
      console.log("Fail to update test", err);
    },
  });

  return { updateTestDatabase, isUpdatingTest };
}

export default useUpdateTest;
