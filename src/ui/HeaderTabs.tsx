import styled from "styled-components";
import HomeHeaderButton from "./HomeHeaderButton";
import { useTabs } from "../features/home/useTabs";
import Tab from "./Tab";

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
        <Tab key={tab} id={tab} />
      ))}
    </HeaderTabsStyled>
  );
}

export default HeaderTabs;
