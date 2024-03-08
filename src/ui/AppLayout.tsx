import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import { useEffect } from "react";

const AppLayoutStyled = styled.div`
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainStyled = styled.main`
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`;

function AppLayout(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/explorer");
    }
  }, [location, navigate]);

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
