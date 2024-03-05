import styled from "styled-components";

const CardStyled = styled.div`
  height: 440px;
  width: 300px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  background-color: var(--color-gray-100);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: content-box;
  outline: 4px transparent solid;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 0px 8px;
  align-items: center;
  background-color: var(--color-gray-200);
  font-weight: 500;
  font-size: 1.2rem;
`;

const Question = styled.div`
  flex-grow: 1;
  box-shadow: var(--shadow-md);
`;

const Answer = styled.div`
  flex-grow: 1;
  position: relative;
`;

const HideAnswer = styled.div`
  position: absolute;
  top: 16px;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background-color: rgba(12, 6, 15, 0.50);
  backdrop-filter: blur(4px);
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

function FlashCardEmpty() {
  return (
    <CardStyled>
      <CardHeader />
      <Question />
      <Answer>
        <HideAnswer />
      </Answer>
    </CardStyled>
  );
}

export default FlashCardEmpty;
