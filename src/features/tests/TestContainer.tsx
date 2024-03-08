import styled from "styled-components";
import HeaderTest from "./HeaderTest";
import TestDatabaseSync from "./TestDatabaseSync";
import TestProgress from "./TestProgress";
import SettingsTestSidePannel from "./SettingsTestSidePannel";
import TestBody from "./TestBody";
import useTestStore from "./useTestStore";

const TestContainerStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const TestHeaderContainer = styled.div`
  padding: 32px;
  gap: 32px;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-element);
  box-shadow: var(--shadow-md);
`;

function TestContainer() {
  const {test} = useTestStore()
  
  return (
      <TestContainerStyled key={test?._id}>
      <TestDatabaseSync />
        <SettingsTestSidePannel />
        <TestHeaderContainer>
          <HeaderTest />
          <TestProgress />
        </TestHeaderContainer>
        <TestBody/>
      </TestContainerStyled>
  );
}

export default TestContainer;
