import styled from "styled-components";
import ConfigTest from "./ConfigTest";
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
  const {
    test,
    setTest,
    isSyncWithDb,
    setIsSyncWithDb,
    skipTimeout,
    setSkipTimeout,
  } = useTestStore();
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
      (!isTimedOut || skipTimeout) &&
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
      if (skipTimeout) {
        setSkipTimeout(false);
      }
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
    skipTimeout,
    setSkipTimeout,
  ]);

  return (
    <TestContainerStyled>
      <ConfigTest />
      <TestBody />
    </TestContainerStyled>
  );
}

export default TestContainer;
