import styled, { css } from "styled-components";
import { useFindFileById } from "../features/home/useFindFileById";
import { IoDocumentOutline, IoClose, IoDocument } from "react-icons/io5";
import { useState } from "react";
import { useTabs } from "../features/home/useTabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type tabProps = {
  id: string;
};

type TabStyledProps = {
  $active: boolean;
  onClick: (e: MouseEvent) => void;
};

const TabStyled = styled.div<TabStyledProps>`
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
  user-select: none;

  &:hover {
    background-color: var(--bg-white);
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--bg-white);
    `}
`;

type CloseButtonProps = {
  $isDisplay: boolean;
  onClick: (e: MouseEvent) => void;
};

const CloseButton = styled.button<CloseButtonProps>`
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border: none;
  opacity: ${(props) => (props.$isDisplay ? 1 : 0)};
  color: var(--text-main-medium);
  cursor: pointer;
  &:hover {
    color: var(--text-main-dark);
  }
`;

function Tab({ id }: tabProps): JSX.Element | null {
  const { fileDetail, isFileLoading } = useFindFileById(id);
  const [isHover, setIsHover] = useState<boolean>(false);
  const { closeTab } = useTabs();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const tabActive: boolean = fileDetail
    ? location.pathname.startsWith(`/cartography/${fileDetail.file._id}`)
    : false;

  if (isFileLoading || !fileDetail) return null;

  function handleCloseTab(e: MouseEvent) {
    e.stopPropagation();
    if (tabActive) {
      navigate(`/explorer/`);
    }
    closeTab(id);
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    if (!tabActive) {
      queryClient.invalidateQueries({queryKey: ["file"]})
      navigate(`/cartography/${id}`);
    }
  }

  return (
    <TabStyled
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClick}
      $active={tabActive}
    >
      {tabActive ? <IoDocument size={20} /> : <IoDocumentOutline size={20} />}

      {fileDetail.file.fileName}
      <CloseButton $isDisplay={isHover} onClick={handleCloseTab}>
        <IoClose size={20} />
      </CloseButton>
    </TabStyled>
  );
}

export default Tab;
