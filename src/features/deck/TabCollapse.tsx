import { useCallback } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const DeckHeaderStyled = styled.div`
  height: 20px;
  display: flex;
  padding: 8px 16px;
  align-items: center;
  box-shadow: var(--shadow-md);
  background-color: var(--color-gray-50);
  font-weight: 500;
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    background-color: var(--color-gray-100);
  }
`;

function TabCollapse() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = useCallback(() => {
    searchParams.delete("deckOpen");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <DeckHeaderStyled onClick={handleClick}>
      <HiChevronDown />
      <HiChevronDown />
    </DeckHeaderStyled>
  );
}

export default TabCollapse;
