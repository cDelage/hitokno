import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const AppLayoutStyled = styled.div`
height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainStyled = styled.main`
  flex-grow: 1;
`;

function AppLayout(): JSX.Element {
  return (
    <AppLayoutStyled>
      <Header />
      <MainStyled>
        <Outlet />
      </MainStyled>
    </AppLayoutStyled>
  );
}

export default AppLayout;
