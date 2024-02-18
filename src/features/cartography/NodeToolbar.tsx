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
  ThemeLight,
  ThemesDark,
} from "./CartographyConstants";
import OpenSheetIcon from "../../ui/icons/OpenSheetIcon";
import useNodeToolbar from "./useNodeToolbar";
import FakeSelector from "../../ui/FakeSelector";
import useCartography from "./useCartography";
import { Shadow, Theme } from "../../types/Cartography.type";

const IconContainer = styled.div`
  height: 28px;
  width: 28px;
  overflow: visible;
  display: flex;
  align-items: center;
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
  const { theme, shadow } = data;

  function handleSetTheme(theme: Theme) {
    setNodeData(selectedNodeId, {
      ...data,
      theme: theme,
    });
  }

  function handleSetShadow(shadow: Shadow) {
    setNodeData(selectedNodeId, {
      ...data,
      shadow: shadow,
    });
  }

  return (
    <MenuToolbar $position={{ ...positionToolbar }}>
      <MenuToolbar.ActionLine>
        <MenuToolbar.Action>
          <IconContainer>
            <ShapesIcon />
          </IconContainer>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>
        <MenuToolbar.ToggleSubMenu name="color">
          <MenuToolbar.Action>
            <IconContainer>
              <ColorNodeIcon fill={theme.fill} />
            </IconContainer>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>
        <MenuToolbar.ToggleSubMenu name="shadow">
          <MenuToolbar.Action border={MenuBorderRight}>
            <IconContainer>
              <ShadowIcon />
            </IconContainer>
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
          <IconContainer>
            <BiBold size={"90%"} />
          </IconContainer>
        </MenuToolbar.Action>
        <MenuToolbar.Action>
          <IconContainer>
            <BiItalic size={"90%"} />
          </IconContainer>
        </MenuToolbar.Action>
        <MenuToolbar.Action>
          <IconContainer>
            <BiUnderline size={"90%"} />
          </IconContainer>
        </MenuToolbar.Action>
        <MenuToolbar.Action border={MenuBorderRight}>
          <IconContainer>
            <BiListUl size={"90%"} />
          </IconContainer>
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
              <IconContainer>
                <ColorNodeIcon fill={themeDark.fill} />
              </IconContainer>
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
              <IconContainer>
                <ColorNodeIcon fill={themeLight.fill} />
              </IconContainer>
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
              <IconContainer>
                <ShadowDiv shadow={shadowsMenu.shadowMenu} />
              </IconContainer>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>
    </MenuToolbar>
  );
}

export default NodeToolbar;
