import styled from "styled-components";
import HomeHeaderButton from "./HomeHeaderButton";
import { useTabs } from "../features/home/useTabs";
import TabFile from "./TabFile";
import TabTest from "./TabTest";
import { DragEvent, Fragment, useCallback, useState } from "react";
import moveElement from "../utils/MoveElement";
import { HeaderTab } from "../types/Tabs.types";

const HeaderTabsStyled = styled.div`
  -webkit-app-region: no-drag;
  height: 100%;
  display: flex;
  align-items: center;
`;

function HeaderTabs(): JSX.Element {
  const { tabs, setTabs } = useTabs();
  const [currentDrag, setCurrentDrag] = useState<string | undefined>(undefined);

  const handleDragStart = useCallback((id: string) => {
    // Changer le curseur au besoin
    setCurrentDrag(id);
  }, []);

  const handleDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      const indexTarget = tabs.findIndex(
        (selected) => selected.tabId === currentDrag
      );
      if (currentDrag !== undefined && tabs) {
        const newTabs = moveElement<HeaderTab>(tabs, indexTarget, index);
        setTabs(newTabs);
      }
    },
    [currentDrag, tabs, setTabs]
  );

  const handleDrop = useCallback(() => {
    setCurrentDrag(undefined);
  }, [setCurrentDrag]);

  return (
    <HeaderTabsStyled id="header-tabs-container">
      <HomeHeaderButton />
      {tabs.map((tab, index) => (
        <Fragment key={tab.tabId}>
          {tab.type === "FILE" && (
            <TabFile
              tab={tab}
              index={index}
              dragEnter={handleDragEnter}
              dragStart={handleDragStart}
              dragEnd={handleDrop}
            />
          )}
          {tab.type === "TEST" && (
            <TabTest
              tab={tab}
              index={index}
              dragEnter={handleDragEnter}
              dragStart={handleDragStart}
              dragEnd={handleDrop}
            />
          )}
        </Fragment>
      ))}
    </HeaderTabsStyled>
  );
}

export default HeaderTabs;
