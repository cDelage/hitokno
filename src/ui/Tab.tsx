import styled from "styled-components";
import { useFindFileById } from "../features/home/useFindFileById";
import { IoDocumentOutline, IoClose } from "react-icons/io5";
import { useState } from "react";
import { useTabs } from "../features/home/useTabs";

type tabProps = {
  id: string;
};

const TabStyled = styled.button`
  display: flex;
  gap: 8px;
  padding: 4px 4px 4px 8px;
  height: 100%;
  align-items: center;
  background: none;
  border: none;
  color: var(--text-layout);
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-white);
  }
`;

type CloseButtonProps = {
  $isDisplay: boolean;
  onClick: (e : MouseEvent) => void
};

const CloseButton = styled.button<CloseButtonProps>`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border: none;
  opacity: ${(props) => (props.$isDisplay ? 1 : 0)};
  color: var(--text-main-medium);
  cursor: pointer;
  &:hover{
    color: var(--text-main-dark)
  }
`;

function Tab({ id }: tabProps): JSX.Element | null {
  const { fileDetail, isFileLoading } = useFindFileById(id);
  const [isHover, setIsHover] = useState<boolean>(false);
  const {closeTab} = useTabs();

  if (isFileLoading || !fileDetail) return null;

  function handleCloseTab(e : MouseEvent){
    e.stopPropagation();
    closeTab(id);
  }

  return (
    <TabStyled
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <IoDocumentOutline size={20} />
      {fileDetail.file.fileName}
      <CloseButton $isDisplay={isHover} onClick={handleCloseTab}>
        <IoClose size={20} />
      </CloseButton>
    </TabStyled>
  );
}

export default Tab;
