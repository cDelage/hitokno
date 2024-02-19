import styled from "styled-components";
import MenuToolbar from "../../ui/MenuToolbar";
import ShapesIcon from "../../ui/icons/ShapesIcon";
import { HiChevronUp } from "react-icons/hi2";
import ColorNodeIcon from "../../ui/icons/ColorNodeIcon";
import ShadowIcon from "../../ui/icons/ShadowIcon";
import { BiBold, BiItalic, BiUnderline, BiListUl } from "react-icons/bi";
import {
  MenuBorderRight,
  ShadowsMenu,
  ShapeMenu,
  ThemeLight,
  ThemesDark,
} from "./CartographyConstants";
import OpenSheetIcon from "../../ui/icons/OpenSheetIcon";
import useNodeToolbar from "./useNodeToolbar";
import FakeSelector from "../../ui/FakeSelector";
import useCartography from "./useCartography";
import { Shadow, Shape, Theme } from "../../types/Cartography.type";
import ShapeDispatch from "./shapes/ShapeDispatch";
import { ToolbarSmallIcon } from "../../ui/ToolbarSmallIcon";
import { RxBorderAll } from "react-icons/rx";
import { RxBorderNone } from "react-icons/rx";

const ShapeContainer = styled.div`
  height: 40px;
  width: 40px;
  overflow: visible;
  position: relative;
`;

const IconContainerLarge = styled.div`
  height: 28px;
  width: 52px;
  overflow: visible;
  display: flex;
  align-items: center;
`;

type ShadowProps = {
  shadow?: string;
};

const ShadowDiv = styled.div<ShadowProps>`
  height: 24px;
  width: 24px;
  border-radius: 4px;
  background-color: var(--color-gray-100);
  border: solid 2px var(--color-gray-300);
  box-shadow: ${(props) => props.shadow};
`;

function NodeToolbar(): JSX.Element | null {
  const { positionToolbar, selectedNodeId } = useNodeToolbar();
  const { getNodeData, setNodeData } = useCartography();

  if (!positionToolbar.top || !selectedNodeId) return null;
  const data = getNodeData(selectedNodeId);
  const { theme, shadow, shape, border } = data;

  function handleSetTheme(theme: Theme) {
    setNodeData(selectedNodeId, {
      ...data,
      theme,
    });
  }

  function handleSetShadow(shadow: Shadow) {
    setNodeData(selectedNodeId, {
      ...data,
      shadow,
    });
  }

  function handleSetShape(shape: Shape) {
    setNodeData(selectedNodeId, {
      ...data,
      shape,
    });
  }

  function handleSetBorder(border: boolean) {
    setNodeData(selectedNodeId, {
      ...data,
      border,
    });
  }

  return (
    <MenuToolbar $position={{ ...positionToolbar }}>
      <MenuToolbar.ActionLine>
        <MenuToolbar.ToggleSubMenu name="shape">
          <MenuToolbar.Action $padding="8px 4px 8px 8px">
            <ToolbarSmallIcon>
              <ShapesIcon />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>
        <MenuToolbar.ToggleSubMenu name="color">
          <MenuToolbar.Action $padding="8px 4px 8px 8px">
            <ToolbarSmallIcon>
              <ColorNodeIcon fill={theme.fill} />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>
        <MenuToolbar.ToggleSubMenu name="stroke">
          <MenuToolbar.Action $padding="8px 4px 8px 8px">
            <ToolbarSmallIcon>
              <RxBorderAll size={"100%"} />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>
        <MenuToolbar.ToggleSubMenu name="shadow">
          <MenuToolbar.Action
            border={MenuBorderRight}
            $padding="8px 4px 8px 8px"
          >
            <ToolbarSmallIcon>
              <ShadowIcon />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>
        <MenuToolbar.Action>
          <FakeSelector>
            Police <HiChevronUp size={12} />
          </FakeSelector>
        </MenuToolbar.Action>
        <MenuToolbar.Action>
          <FakeSelector>
            H1 <HiChevronUp size={12} />
          </FakeSelector>
        </MenuToolbar.Action>
        <MenuToolbar.Action>
          <ToolbarSmallIcon>
            <BiBold size={"100%"} />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>
        <MenuToolbar.Action>
          <ToolbarSmallIcon>
            <BiItalic size={"100%"} />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>
        <MenuToolbar.Action>
          <ToolbarSmallIcon>
            <BiUnderline
              size={"100%"}
              style={{ transform: "translateY(1px)" }}
            />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>
        <MenuToolbar.Action border={MenuBorderRight}>
          <ToolbarSmallIcon>
            <BiListUl size={"100%"} />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>
        <MenuToolbar.Action>
          <IconContainerLarge>
            <OpenSheetIcon />
          </IconContainerLarge>
        </MenuToolbar.Action>
      </MenuToolbar.ActionLine>
      <MenuToolbar.SubMenu name="color">
        <MenuToolbar.ActionLine>
          {ThemesDark.map((themeDark) => (
            <MenuToolbar.Action
              key={themeDark.fill}
              $active={themeDark.id === theme.id}
              onClick={() => handleSetTheme(themeDark)}
            >
              <ToolbarSmallIcon>
                <ColorNodeIcon fill={themeDark.fill} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
        <MenuToolbar.ActionLine>
          {ThemeLight.map((themeLight) => (
            <MenuToolbar.Action
              key={themeLight.fill}
              $active={themeLight.id === theme.id}
              onClick={() => handleSetTheme(themeLight)}
            >
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
            <MenuToolbar.Action
              key={shadowsMenu.shadow}
              $active={shadow === shadowsMenu.shadow}
              onClick={() => handleSetShadow(shadowsMenu.shadow)}
            >
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
            <MenuToolbar.Action
              key={shapeMenu}
              $active={shape === shapeMenu}
              onClick={() => handleSetShape(shapeMenu)}
            >
              <ShapeContainer>
                <ShapeDispatch
                  shape={shapeMenu}
                  fill={theme.fill}
                  $shadow="var(--shadow-shape-menu-md)"
                />
              </ShapeContainer>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>
      <MenuToolbar.SubMenu name="stroke">
        <MenuToolbar.ActionLine>
          <MenuToolbar.Action $active={!border} onClick={() => handleSetBorder(false)}>
            <ToolbarSmallIcon>
              <RxBorderNone size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
          <MenuToolbar.Action $active={border} onClick={() => handleSetBorder(true)}>
            <ToolbarSmallIcon>
              <RxBorderAll size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>
    </MenuToolbar>
  );
}

export default NodeToolbar;
