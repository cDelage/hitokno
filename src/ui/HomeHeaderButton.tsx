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
  color: var(--text-layout);

  ${(props) =>
    props.$tabState === "default"
      ? css`
          background-color: transparent;

          &:hover {
            background-color: var(--bg-white);
          }
        `
      : css`
          background-color: white;
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
      {isHomeActive ? <IoHome size={24} /> : <IoHomeOutline size={24} />}
    </HomeHeaderButtonStyled>
  );
}

export default HomeHeaderButton;
