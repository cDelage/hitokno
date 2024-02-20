import styled from "styled-components";
import MenuToolbar from "../../ui/MenuToolbar";
import ToolbarAction from "../../ui/ToolbarAction";
import DeckIcon from "../../ui/icons/DeckIcon";
import SidebarIcon from "../../ui/icons/SidebarIcon";
import { IoArrowForward, IoArrowUp, IoAdd } from "react-icons/io5";
import {
  MenuBorderRight,
  ShadowsMenu,
  ShapeMenu,
  ThemeLight,
  ThemesDark,
} from "./CartographyConstants";
import ShapeDispatch from "./shapes/ShapeDispatch";
import { HiChevronUp } from "react-icons/hi2";
import { ToolbarSmallIcon } from "../../ui/ToolbarSmallIcon";
import ColorNodeIcon from "../../ui/icons/ColorNodeIcon";
import ShapesIcon from "../../ui/icons/ShapesIcon";
import ShadowIcon from "../../ui/icons/ShadowIcon";
import EdgeIcon from "../../ui/icons/EdgeIcon";
import GroupIcon from "../../ui/icons/GroupIcon";
import { RxBorderAll, RxBorderNone, RxMove, RxGroup } from "react-icons/rx";
import { ShadowProps } from "../../types/Cartography.type";
import { useEffect } from "react";
import useCartography from "./useCartography";

const ToolbarLargeIconContainer = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ToolbarMediumIconContainer = styled.div`
  width: 52px;
  height: 52px;
  position: relative;
`;

const ShadowDiv = styled.div<ShadowProps>`
  height: 24px;
  width: 24px;
  border-radius: 4px;
  background-color: var(--color-gray-100);
  border: solid 2px var(--color-gray-300);
  box-shadow: ${(props) => props.shadow};
`;

const ShapeContainer = styled.div`
  height: 40px;
  width: 40px;
  overflow: visible;
  position: relative;
`;

function MainToolbar() {
  const {
    setCreateNodeMode,
    clearCreateNodeMode,
    mainToolbarActiveMenu,
    setMainToolbarActiveMenu,
  } = useCartography();

  //Manage menu change selection
  useEffect(() => {
    if (mainToolbarActiveMenu === "CREATION-NODE") {
      setCreateNodeMode();
    } else {
      clearCreateNodeMode();
    }
  }, [mainToolbarActiveMenu, setCreateNodeMode, clearCreateNodeMode]);

  return (
    <MenuToolbar
    $position={{
      bottom: 0,
      left: "50%",
    }}
    >
      <MenuToolbar.ActionLine>
    {/* Move viewport */}
    <MenuToolbar.ActionColumn>
      <MenuToolbar.Action
        border={MenuBorderRight}
        $padding="8px 16px 8px 16px"
        $active={mainToolbarActiveMenu === undefined}
        onClick={() => setMainToolbarActiveMenu(undefined)}
      >
        <ToolbarSmallIcon>
          <RxMove size={"100%"} />
        </ToolbarSmallIcon>
      </MenuToolbar.Action>
      <MenuToolbar.Action
        border={MenuBorderRight}
        $padding="8px 16px 8px 16px"
        $active={mainToolbarActiveMenu === "SELECT"}
        onClick={() => setMainToolbarActiveMenu("SELECT")}
      >
        <ToolbarSmallIcon>
          <RxGroup size={"100%"} />
        </ToolbarSmallIcon>
      </MenuToolbar.Action>
    </MenuToolbar.ActionColumn>
        {/* Sidebar (to list all nodes) */}
        <MenuToolbar.Action>
          <ToolbarAction>
            <ToolbarLargeIconContainer>
              <SidebarIcon />
            </ToolbarLargeIconContainer>
            <ToolbarAction.ActionButton $hoverTransform="translateX(8px)">
              <IoArrowForward />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>

        {/* Deck (to create and edit flashcards) */}
        <MenuToolbar.Action border={MenuBorderRight}>
          <ToolbarAction>
            <ToolbarLargeIconContainer>
              <DeckIcon />
            </ToolbarLargeIconContainer>
            <ToolbarAction.ActionButton $hoverTransform="translateY(-8px)">
              <IoArrowUp />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>


        <MenuToolbar.ActionColumn>
          <MenuToolbar.ActionLine>
            {/* Shapes (select rect, ellipse, triangle...) */}
            <MenuToolbar.ToggleSubMenu name="shape">
              <MenuToolbar.Action $padding="8px 4px 8px 16px">
                <ToolbarSmallIcon>
                  <ShapesIcon />
                </ToolbarSmallIcon>
                <HiChevronUp size={12} />
              </MenuToolbar.Action>
            </MenuToolbar.ToggleSubMenu>

            {/* Color of the shape */}
            <MenuToolbar.ToggleSubMenu name="color">
              <MenuToolbar.Action $padding="8px 4px 8px 8px">
                <ToolbarSmallIcon>
                  <ColorNodeIcon fill={"#0284C7"} />
                </ToolbarSmallIcon>
                <HiChevronUp size={12} />
              </MenuToolbar.Action>
            </MenuToolbar.ToggleSubMenu>
          </MenuToolbar.ActionLine>

          <MenuToolbar.ActionLine>
            {/* Border */}
            <MenuToolbar.ToggleSubMenu name="stroke">
              <MenuToolbar.Action $padding="8px 4px 8px 16px">
                <ToolbarSmallIcon>
                  <RxBorderAll size={"100%"} />
                </ToolbarSmallIcon>
                <HiChevronUp size={12} />
              </MenuToolbar.Action>
            </MenuToolbar.ToggleSubMenu>

            {/* Shadow */}
            <MenuToolbar.ToggleSubMenu name="shadow">
              <MenuToolbar.Action $padding="8px 4px 8px 8px">
                <ToolbarSmallIcon>
                  <ShadowIcon />
                </ToolbarSmallIcon>
                <HiChevronUp size={12} />
              </MenuToolbar.Action>
            </MenuToolbar.ToggleSubMenu>
          </MenuToolbar.ActionLine>
        </MenuToolbar.ActionColumn>

        {/* Create new shape */}
        <MenuToolbar.Action
          onClick={() => setMainToolbarActiveMenu("CREATION-NODE")}
          $active={mainToolbarActiveMenu === "CREATION-NODE"}
        >
          <ToolbarAction>
            <ToolbarLargeIconContainer>
              <ToolbarMediumIconContainer>
                <ShapeDispatch shape="rect" fill={"#0284C7"} $shadow="none" />
              </ToolbarMediumIconContainer>
            </ToolbarLargeIconContainer>
            <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
              <IoAdd size={24} />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>

        {/* Create new edge */}
        <MenuToolbar.Action
          onClick={() => setMainToolbarActiveMenu("CREATION-EDGE")}
          $active={mainToolbarActiveMenu === "CREATION-EDGE"}
        >
          <ToolbarAction>
            <ToolbarLargeIconContainer>
              <ToolbarMediumIconContainer>
                <EdgeIcon />
              </ToolbarMediumIconContainer>
            </ToolbarLargeIconContainer>
            <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
              <IoAdd size={24} />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>

        {/* Create new group */}
        <MenuToolbar.Action
          onClick={() => setMainToolbarActiveMenu("CREATION-GROUP")}
          $active={mainToolbarActiveMenu === "CREATION-GROUP"}
        >
          <ToolbarAction>
            <ToolbarLargeIconContainer>
              <ToolbarMediumIconContainer>
                <GroupIcon />
              </ToolbarMediumIconContainer>
            </ToolbarLargeIconContainer>
            <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
              <IoAdd size={24} />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>
      </MenuToolbar.ActionLine>

      <MenuToolbar.SubMenu name="color">
        <MenuToolbar.ActionLine>
          {ThemesDark.map((themeDark) => (
            <MenuToolbar.Action key={themeDark.fill} $active={false}>
              <ToolbarSmallIcon>
                <ColorNodeIcon fill={themeDark.fill} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>

        <MenuToolbar.ActionLine>
          {ThemeLight.map((themeLight) => (
            <MenuToolbar.Action key={themeLight.fill} $active={false}>
              <ToolbarSmallIcon>
                <ColorNodeIcon fill={themeLight.fill} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="shadow">
        <MenuToolbar.ActionLine>
          {ShadowsMenu.map((shadowsMenu) => (
            <MenuToolbar.Action key={shadowsMenu.shadow} $active={false}>
              <ToolbarSmallIcon>
                <ShadowDiv shadow={shadowsMenu.shadowMenu} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="shape">
        <MenuToolbar.ActionLine>
          {ShapeMenu.map((shapeMenu) => (
            <MenuToolbar.Action key={shapeMenu} $active={false}>
              <ShapeContainer>
                <ShapeDispatch
                  shape={shapeMenu}
                  fill={"#0284C7"}
                  $shadow="var(--shadow-shape-menu-md)"
                />
              </ShapeContainer>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="stroke">
        <MenuToolbar.ActionLine>
          <MenuToolbar.Action $active={false}>
            <ToolbarSmallIcon>
              <RxBorderNone size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
          <MenuToolbar.Action $active={false}>
            <ToolbarSmallIcon>
              <RxBorderAll size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>
    </MenuToolbar>
  );
}

export default MainToolbar;
