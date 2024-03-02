import { useMutation } from "@tanstack/react-query";
import { useTabs } from "../home/useTabs";
import { useNavigate } from "react-router-dom";

function useCreateTest() {
  const { openTab } = useTabs();
  const navigate = useNavigate();

  const { mutate: createTest, isPending: isCreatingTest } = useMutation({
    mutationFn: (decks: string[]) => window.tests.createTest({ decks }),
    onError: (err: Error) => {
      console.log("Fail to create new test", err);
    },
    onSuccess: (test) => {
      openTab(test._id, "DEFAULT", "TEST");
      navigate(`/test/${test._id}`);
    },
  });

  return { createTest, isCreatingTest };
}

export default useCreateTest;
