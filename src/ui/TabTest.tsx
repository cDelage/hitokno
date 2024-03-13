import styled from "styled-components";
import { HeaderTab } from "../types/Tabs.types";
import useFindTestById from "../features/tests/useFindTestById";
import { CloseButton, TabStyled, TextContainer } from "./TabStyled";
import { IoClose, IoPlay, IoPlayOutline } from "react-icons/io5";
import { DragEvent, useCallback, useState } from "react";
import { useTabs } from "../features/home/useTabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const IconContainer = styled.div`
  height: 20px;
  width: 20px;
  min-height: 20px;
  min-width: 20px;
`;

function TabTest({
  tab: { tabId },
  dragStart,
  dragEnter,
  dragEnd,
  index,
}: {
  tab: HeaderTab;
  index: number;
  dragStart?: (id: string) => void;
  dragEnter?: (e: DragEvent<HTMLDivElement>, index: number) => void;
  dragEnd?: (e: DragEvent<HTMLDivElement>, index: number) => void;
}) {
  const { testData, isLoadingTest } = useFindTestById(tabId);
  const [isHover, setIsHover] = useState<boolean>(false);
  const { closeTab } = useTabs();
  const navigate = useNavigate();
  const location = useLocation();

  const tabActive: boolean = location.pathname.startsWith(`/test/${tabId}`);
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({ queryKey: ["test"] }).then(() => {
          queryClient
            .invalidateQueries({ queryKey: ["file"], exact: false })
            .then(() => {
              navigate(`/test/${tabId}`);
            });
        });
      }
    },
    [tabActive, queryClient, navigate, tabId]
  );

  if (isLoadingTest || !testData) return null;

  return (
    <TabStyled
      $active={tabActive}
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      draggable
      onDragStart={() => dragStart?.(tabId)}
      onDragEnter={(e: DragEvent<HTMLDivElement>) => dragEnter?.(e, index)}
      onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEnd?.(e, index)}
    >
      <IconContainer>
        {tabActive ? <IoPlay size={20} /> : <IoPlayOutline size={20} />}
      </IconContainer>
      <TextContainer>{testData.testName}</TextContainer>
      <CloseButton $isDisplay={isHover} onClick={handleCloseTab}>
        <IoClose size={20} />
      </CloseButton>
    </TabStyled>
  );
}

export default TabTest;
