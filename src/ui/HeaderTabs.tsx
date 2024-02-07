import styled from "styled-components";
import HomeHeaderButton from "./HomeHeaderButton";

const HeaderTabsStyled = styled.div`
  -webkit-app-region: no-drag;
  height: 100%;
  display: flex;
  align-items: center;
`;

function HeaderTabs(): JSX.Element {
  return (
    <HeaderTabsStyled id="header-tabs-container">
      <HomeHeaderButton />
    </HeaderTabsStyled>
  );
}

export default HeaderTabs;
