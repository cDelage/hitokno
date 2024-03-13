import styled from "styled-components";

import WindowHeaderManagement from "./WindowHeaderManagement";
import HeaderTabs from "./HeaderTabs";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-layout);
  width: 100%;
  height: 36px;
  min-height: 36px;
  -webkit-app-region: drag;
`;

function Header() {
  return (
    <HeaderStyled>
      <HeaderTabs />
      <WindowHeaderManagement />
    </HeaderStyled>
  );
}

export default Header;
  