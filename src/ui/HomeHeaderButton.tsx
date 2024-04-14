import { IoHomeOutline, IoHome } from "react-icons/io5";
import styled, { css } from "styled-components";
import { TabState } from "../types/Tabs.types.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type HomeHeaderButtonStyledProps = {
  $tabState: TabState;
};

const HomeHeaderButtonStyled = styled.button<HomeHeaderButtonStyledProps>`
  height: 100%;
  border: none;
  padding: 0px 12px;
  cursor: pointer;
  color: var(--text-main-medium);

  ${(props) =>
    props.$tabState === "default"
      ? css`
          background-color: transparent;

          &:hover {
            color: var(--text-layout);
            background-color: var(--bg-white);
          }
        `
      : css`
          color: var(--text-layout);
          background-color: white;
      border-right: 1px solid var(--color-gray-200);
        `}
`;

function HomeHeaderButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isHomeActive, setIsHomeActive] = useState(false);

  function goToHome() {
    if (!isHomeActive) {
      queryClient
        .invalidateQueries({ queryKey: ["test"] })
        .then(() => {
          queryClient
            .invalidateQueries({ queryKey: ["file"], exact: false })
            .then(() => {
              queryClient
                .invalidateQueries({ queryKey: ["repository"], exact: false })
                .then(() => {
                  navigate("/explorer");
                });
            });
        })
        .catch((error: Error) => {
          console.log("Fail to navigate : ", error);
        });
    }
  }

  useEffect(() => {
    setIsHomeActive(location.pathname.startsWith("/explorer"));
  }, [location, setIsHomeActive]);

  return (
    <HomeHeaderButtonStyled
      $tabState={isHomeActive ? "active" : "default"}
      onClick={goToHome}
    >
      {isHomeActive ? <IoHome size={20} style={{paddingTop: "4px"}}/> : <IoHomeOutline size={20} style={{paddingTop: "4px"}}/>}
    </HomeHeaderButtonStyled>
  );
}

export default HomeHeaderButton;
