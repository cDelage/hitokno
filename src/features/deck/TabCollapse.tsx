import { HiChevronDown } from "react-icons/hi2";
import styled from "styled-components";

const DeckHeaderStyled = styled.div`
  height: 20px;
  min-height: 20px;
  display: flex;
  padding: 4px 16px;
  align-items: center;
  background-color: var(--color-gray-100);
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    background-color: var(--color-gray-200);
  }
`;

function TabCollapse({onClick} : {onClick : () => void}) {

  return (
    <DeckHeaderStyled onClick={onClick}>
      <HiChevronDown />
      <HiChevronDown />
    </DeckHeaderStyled>
  );
}

export default TabCollapse;
