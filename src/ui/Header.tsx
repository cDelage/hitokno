import styled from "styled-components";

import WindowHeaderManagement from "./WindowHeaderManagement";
import HeaderTabs from "./HeaderTabs";
import { useNavigate } from "react-router-dom";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-layout);
  width: 100%;
  height: 32px;
  -webkit-app-region: drag;
`;

const FakeStyled = styled.div`
  -webkit-app-region: no-drag;
`

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderStyled>
      <HeaderTabs />
      <FakeStyled>
        <button onClick={() => navigate("/fake")}>FAKE</button>
      </FakeStyled>
      <WindowHeaderManagement />
    </HeaderStyled>
  );
}

export default Header;
