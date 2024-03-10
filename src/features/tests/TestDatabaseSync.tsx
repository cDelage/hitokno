import { useEffect } from "react";
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
    getCardListFromRepository,
    setTempFlashCards,
  } = useTestStore();
  const { updateTestDatabase } = useUpdateTest();
  const { repository } = useFindRepository();

  useEffect(() => {
    if (!isLoadingTest && testData?._id) {
      setTest(testData);
    }
  }, [testData, setTest, isLoadingTest]);

  useEffect(() => {
    if (test?._id && !isSyncWithDb) {
      updateTestDatabase({ test });
      setIsSyncWithDb(true)
    }
  }, [
    test,
    updateTestDatabase,
    isSyncWithDb, setIsSyncWithDb
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

  useEffect(() => {
    if(test?.status){
      setIsSyncWithDb(false)
    }
  }, [test?.status, setIsSyncWithDb])

  return null;
}

export default TestDatabaseSync;
