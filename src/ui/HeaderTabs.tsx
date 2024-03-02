import styled from "styled-components";
import HomeHeaderButton from "./HomeHeaderButton";
import { useTabs } from "../features/home/useTabs";
import TabFile from "./TabFile";
import TabTest from "./TabTest";
import { Fragment } from "react";

const HeaderTabsStyled = styled.div`
  -webkit-app-region: no-drag;
  height: 100%;
  display: flex;
  align-items: center;
`;

function HeaderTabs(): JSX.Element {
  const { tabs } = useTabs();

  return (
    <HeaderTabsStyled id="header-tabs-container">
      <HomeHeaderButton />
      {tabs.map((tab) => (
        <Fragment key={tab.tabId}>
          {tab.type === "FILE" && <TabFile  tab={tab} />}
          {tab.type === "TEST" && <TabTest tab={tab} />}
        </Fragment>
      ))}
    </HeaderTabsStyled>
  );
}

export default HeaderTabs;
