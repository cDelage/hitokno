import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";
import WindowHeaderButton from "./WindowHeaderButton";
import { useEffect, useState } from "react";
import styled from "styled-components";
//import { useNavigate } from "react-router-dom";

const WindowIconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  -webkit-app-region: no-drag;
`;

/**
 * Right button in header ( _ [] X )
 */
function WindowHeaderManagement(): JSX.Element {
  const [isMaximizedWindow, setIsMaximizedWindow] = useState(false);
  //const navigate = useNavigate();

  const { maximize, minimize, unmaximize, close, isMaximized } =
    window.windowManagement;

  async function voidTemp() {}

  useEffect(() => {
    async function handleResize() {
      const isMax = await isMaximized();
      setIsMaximizedWindow(isMax);
    }

    // Ajouter l'écouteur d'événement lorsque le composant est monté
    window.addEventListener("resize", handleResize);
    handleResize();

    // Supprimer l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMaximizedWindow, isMaximized]);

  return (
    <WindowIconContainer id="header-window-commands-container">
      {/**
       * 
       <button style={{ height: "100%" }} onClick={() => navigate("/fake")}>
         DUMMY
       </button>
       * 
       */}

      <WindowHeaderButton
        hoverBgColor="--bg-white"
        hoverColor="--text-layout"
        onClick={minimize}
      >
        <VscChromeMinimize size={24} />
      </WindowHeaderButton>
      <WindowHeaderButton
        hoverBgColor="--bg-white"
        hoverColor="--text-layout"
        onClick={isMaximizedWindow ? unmaximize : maximize}
      >
        {!isMaximizedWindow && <VscChromeMaximize size={24} />}
        {isMaximizedWindow && <VscChromeRestore size={24} />}
      </WindowHeaderButton>
      <WindowHeaderButton
        hoverBgColor="--bg-close"
        hoverColor="--text-close"
        onClick={voidTemp}
      >
        <VscChromeClose onClick={close} size={24} />
      </WindowHeaderButton>
    </WindowIconContainer>
  );
}

export default WindowHeaderManagement;
