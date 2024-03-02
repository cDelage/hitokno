import styled from "styled-components";
import { HeaderTab } from "../types/Tabs.types";
import useFindTestById from "../features/tests/useFindTestById";
import { CloseButton, TabStyled } from "./TabStyled";
import { IoClose, IoPlay, IoPlayOutline } from "react-icons/io5";
import { useCallback, useState } from "react";
import { useTabs } from "../features/home/useTabs";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const IconContainer = styled.div`
  height: 20px;
  width: 20px;
`;

function TabTest({ tab: { tabId } }: { tab: HeaderTab }) {
  const { testData, isLoadingTest } = useFindTestById(tabId);
  const [isHover, setIsHover] = useState<boolean>(false);
  const { closeTab } = useTabs();
  const navigate = useNavigate();
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
        queryClient.invalidateQueries({ queryKey: ["test"] });
        navigate(`/test/${tabId}`);
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
    >
      <IconContainer>
        {tabActive ? (
          <IoPlay size={"100%"} />
        ) : (
          <IoPlayOutline size={"100%"} />
        )}
      </IconContainer>{" "}
      {testData.testName}
      <CloseButton $isDisplay={isHover} onClick={handleCloseTab}>
        <IoClose size={20} />
      </CloseButton>
    </TabStyled>
  );
}

export default TabTest;
