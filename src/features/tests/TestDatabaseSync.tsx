import { useEffect, useState } from "react";
import useTestStore from "./useTestStore";
import useUpdateTest from "./useUpdateTest";
import useFindTestById from "./useFindTestById";
import { useParams } from "react-router-dom";
import { useFindRepository } from "../home/useFindRepository";

function TestDatabaseSync() {
  const { testId } = useParams();
  const { testData, isLoadingTest } = useFindTestById(testId as string);
  const {
    test,
    setTest,
    isSyncWithDb,
    setIsSyncWithDb,
    skipTimeout,
    setSkipTimeout,
    getCardListFromRepository,
    setTempFlashCards,
  } = useTestStore();
  const { updateTestDatabase, isUpdatingTest } = useUpdateTest();
  const [isTimedOut, setIsTimedOut] = useState(false);
  const { repository } = useFindRepository();

  useEffect(() => {
    if (!isLoadingTest && testData?._id) {
      setTest(testData);
    }
  }, [testData, setTest, isLoadingTest]);

  useEffect(() => {
    if (
      test?._id &&
      (!isTimedOut || skipTimeout) &&
      !isUpdatingTest &&
      !isLoadingTest &&
      !isSyncWithDb
    ) {
      updateTestDatabase({ test });
      setIsSyncWithDb(true);
      setIsTimedOut(true);
      setTimeout(() => {
        setIsTimedOut(false);
      }, 3000);
      if (skipTimeout) {
        setSkipTimeout(false);
      }
    }
  }, [
    test,
    isTimedOut,
    setIsTimedOut,
    isUpdatingTest,
    updateTestDatabase,
    isLoadingTest,
    isSyncWithDb,
    setIsSyncWithDb,
    skipTimeout,
    setSkipTimeout,
  ]);

  //When draft, synchronize temp flash cards
  useEffect(() => {
    if (test?.status === "DRAFT" && repository) {
      const cards = getCardListFromRepository(repository);
      setTempFlashCards(cards);
    }
  }, [
    test?.status,
    test?.decks,
    repository,
    getCardListFromRepository,
    setTempFlashCards,
  ]);


  return null;
}

export default TestDatabaseSync;
