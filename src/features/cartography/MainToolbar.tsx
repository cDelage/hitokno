import styled from "styled-components";
import MenuToolbar from "../../ui/MenuToolbar";
import ToolbarAction from "../../ui/ToolbarAction";
import DeckIcon from "../../ui/icons/DeckIcon";
import SidebarIcon from "../../ui/icons/SidebarIcon";
import { IoArrowForward, IoArrowUp, IoAdd } from "react-icons/io5";
import { MenuBorderRight } from "./CartographyConstants";
import ShapeDispatch from "./shapes/ShapeDispatch";
import { HiChevronUp } from "react-icons/hi2";
import { ToolbarSmallIcon } from "../../ui/ToolbarSmallIcon";
import ColorNodeIcon from "../../ui/icons/ColorNodeIcon";
import ShapesIcon from "../../ui/icons/ShapesIcon";
import ShadowIcon from "../../ui/icons/ShadowIcon";
import EdgeIcon from "../../ui/icons/EdgeIcon";
import GroupIcon from "../../ui/icons/GroupIcon";
import { RxBorderAll } from "react-icons/rx";

const ToolbarLargeIcon = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ToolbarMediumShape = styled.div`
  width: 52px;
  height: 52px;
  position: relative;
`;

function MainToolbar() {
  return (
    <MenuToolbar
      $position={{
        bottom: 0,
        left: "50%",
      }}
    >
      <MenuToolbar.ActionLine>
        {/* Sidebar (to list all nodes) */}
        <MenuToolbar.Action>
          <ToolbarAction>
            <ToolbarLargeIcon>
              <SidebarIcon />
            </ToolbarLargeIcon>
            <ToolbarAction.ActionButton $hoverTransform="translateX(8px)">
              <IoArrowForward />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>

        {/* Deck (to create and edit flashcards) */}
        <MenuToolbar.Action border={MenuBorderRight}>
          <ToolbarAction>
            <ToolbarLargeIcon>
              <DeckIcon />
            </ToolbarLargeIcon>
            <ToolbarAction.ActionButton $hoverTransform="translateY(-8px)">
              <IoArrowUp />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>

        <MenuToolbar.ActionColumn>
          <MenuToolbar.ActionLine>
            {/* Shapes (select rect, ellipse, triangle...) */}
            <MenuToolbar.Action $padding="8px 4px 8px 8px">
              <ToolbarSmallIcon>
                <ShapesIcon />
              </ToolbarSmallIcon>
              <HiChevronUp size={12} />
            </MenuToolbar.Action>

            {/* Color of the shape */}
            <MenuToolbar.Action $padding="8px 4px 8px 8px">
              <ToolbarSmallIcon>
                <ColorNodeIcon fill={"#0284C7"} />
              </ToolbarSmallIcon>
              <HiChevronUp size={12} />
            </MenuToolbar.Action>
          </MenuToolbar.ActionLine>
          <MenuToolbar.ActionLine>
            {/* Border */}
            <MenuToolbar.Action $padding="8px 4px 8px 8px">
              <ToolbarSmallIcon>
                <RxBorderAll size={"100%"} />
              </ToolbarSmallIcon>
              <HiChevronUp size={12} />
            </MenuToolbar.Action>

            {/* Shadow */}
            <MenuToolbar.Action $padding="8px 4px 8px 8px">
              <ToolbarSmallIcon>
                <ShadowIcon />
              </ToolbarSmallIcon>
              <HiChevronUp size={12} />
            </MenuToolbar.Action>
          </MenuToolbar.ActionLine>
        </MenuToolbar.ActionColumn>

        {/* Create new shape */}
        <MenuToolbar.Action>
          <ToolbarAction>
            <ToolbarLargeIcon>
              <ToolbarMediumShape>
                <ShapeDispatch shape="rect" fill={"#0284C7"} $shadow="none" />
              </ToolbarMediumShape>
            </ToolbarLargeIcon>
            <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
              <IoAdd />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>

        {/* Create new edge */}
        <MenuToolbar.Action>
          <ToolbarAction>
            <ToolbarLargeIcon>
              <ToolbarMediumShape>
                <EdgeIcon />
              </ToolbarMediumShape>
            </ToolbarLargeIcon>
            <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
              <IoAdd />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>

        {/* Create new group */}
        <MenuToolbar.Action>
          <ToolbarAction>
            <ToolbarLargeIcon>
              <ToolbarMediumShape>
                <GroupIcon />
              </ToolbarMediumShape>
            </ToolbarLargeIcon>
            <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
              <IoAdd />
            </ToolbarAction.ActionButton>
          </ToolbarAction>
        </MenuToolbar.Action>
      </MenuToolbar.ActionLine>
    </MenuToolbar>
  );
}

export default MainToolbar;
