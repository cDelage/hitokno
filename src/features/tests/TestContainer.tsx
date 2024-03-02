import styled from "styled-components";
import TestConfig from "./TestConfig";
import TestBody from "./TestBody";
import useFindTestById from "./useFindTestById";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTestStore from "./useTestStore";
import useUpdateTest from "./useUpdateTest";

const TestContainerStyled = styled.div`
  height: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  gap: 16px;
`;

function TestContainer() {
  const { testId } = useParams();
  const { testData, isLoadingTest } = useFindTestById(testId as string);
  const { test, setTest, isSyncWithDb, setIsSyncWithDb } = useTestStore();
  const { updateTest, isUpdatingTest } = useUpdateTest();
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    if (!isLoadingTest && testData?._id) {
      setTest(testData);
    }
  }, [testData, setTest, isLoadingTest]);

  useEffect(() => {
    if (
      test?._id &&
      !isTimedOut &&
      !isUpdatingTest &&
      !isLoadingTest &&
      !isSyncWithDb
    ) {
      updateTest({ test });
      setIsSyncWithDb(true);
      setIsTimedOut(true);
      setTimeout(() => {
        setIsTimedOut(false);
      }, 3000);
    }
  }, [
    test,
    isTimedOut,
    setIsTimedOut,
    isUpdatingTest,
    updateTest,
    isLoadingTest,
    isSyncWithDb,
    setIsSyncWithDb,
  ]);

  return (
    <TestContainerStyled>
      <TestConfig />
      <TestBody />
    </TestContainerStyled>
  );
}

export default TestContainer;
