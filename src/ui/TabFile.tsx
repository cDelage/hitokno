import styled from "styled-components";
import { useFindFileById } from "../features/home/useFindFileById";
import { IoDocumentOutline, IoClose, IoDocument } from "react-icons/io5";
import { DragEvent, useCallback, useState } from "react";
import { useTabs } from "../features/home/useTabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { HeaderTab } from "../types/Tabs.types";
import { CloseButton, TabStyled, TextContainer } from "./TabStyled";

const IconContainer = styled.div`
  height: 20px;
  width: 20px;
`;

function TabFile({
  tab: { tabId },
  dragStart,
  dragEnter,
  dragEnd,
  index
}: {
  tab: HeaderTab;
  index: number;
  dragStart?: (id: string) => void;
  dragEnter?: (e: DragEvent<HTMLDivElement>, index: number) => void;
  dragEnd?: (e: DragEvent<HTMLDivElement>, index: number) => void;
}): JSX.Element | null {
  const { fileDetail, isFileLoading } = useFindFileById(tabId);
  const [isHover, setIsHover] = useState<boolean>(false);
  const { closeTab } = useTabs();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const tabActive: boolean = fileDetail
    ? location.pathname.startsWith(`/cartography/${tabId}`)
    : false;

  const handleCloseTab = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (tabActive) {
        navigate(`/explorer/`);
      }
      closeTab(tabId);
    },
    [closeTab, navigate, tabActive, tabId]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (!tabActive) {
        queryClient.invalidateQueries({ queryKey: ["file", tabId] });
        navigate(`/cartography/${tabId}`);
      }
    },
    [tabActive, queryClient, navigate, tabId]
  );

  if (isFileLoading || !fileDetail) return null;

  return (
    <TabStyled
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClick}
      $active={tabActive}
      draggable
      onDragStart={() => dragStart?.(tabId)}
      onDragEnter={(e: DragEvent<HTMLDivElement>) => dragEnter?.(e, index)}
      onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEnd?.(e, index)}
    >
      <IconContainer>
        {tabActive ? (
          <IoDocument size={"100%"} />
        ) : (
          <IoDocumentOutline size={"100%"} />
        )}
      </IconContainer>

      <TextContainer>{fileDetail.file.fileName}</TextContainer>
      <CloseButton $isDisplay={isHover} onClick={handleCloseTab}>
        <IoClose size={20} />
      </CloseButton>
    </TabStyled>
  );
}

export default TabFile;
