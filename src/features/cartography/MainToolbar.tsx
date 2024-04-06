import styled from "styled-components";
import MenuToolbar from "../../ui/MenuToolbar";
import ToolbarAction from "../../ui/ToolbarAction";
import DeckIcon from "../../ui/icons/DeckIcon";
import SidebarIcon from "../../ui/icons/SidebarIcon";
import { IoArrowForward, IoArrowUp, IoAdd, IoArrowBack } from "react-icons/io5";
import {
  ArrowEndArray,
  EDGE_COLORS,
  EDGE_DASH_ARRAY,
  EdgeCategoryArray,
  EdgeWeightArray,
  MENU_BORDER_LEFT,
  MENU_BORDER_RIGHT,
  SHADOWS_MENU,
  ShapeMenu,
  THEME_LIGHT,
  THEMES_DARK,
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
import {
  ArrowEndType,
  EdgeCategoryType,
  EdgeDashType,
  EdgeWeightType,
  ShadowProps,
} from "../../types/Cartography.type";
import { useCallback, useEffect } from "react";
import useCartography from "./useCartography";
import { useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import EdgeCategoryIcon from "../../ui/icons/EdgeCategoryIcon";
import EdgeDoubleEndIcon from "../../ui/icons/EdgeDoubleEndIcon";
import EdgeWeightDashIcon from "../../ui/icons/EdgeWeightDashIcon";
import ArrowEndIcon from "../../ui/icons/ArrowEndIcon";
import EdgeDashIcon from "../../ui/icons/EdgeDashIcon";
import EdgeWeightIcon from "../../ui/icons/EdgeWeightIcon";

const ToolbarLargeIconContainer = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const EdgeIconContainer = styled.div`
  width: 50px;
  height: 54px;
  padding-bottom: 16px;
  padding-right: 12px;
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
    getCreationNode,
    setCreateGroupMode,
    clearCreateGroupMode,
    clearCreateNodeMode,
    mainToolbarActiveMenu,
    setMainToolbarActiveMenu,
    shapeCreationDesc,
    setShapeCreationDesc,
    menuDataEdge,
    setMenuDataEdge,
  } = useCartography();
  const {
    theme: { id: themeId, fill, stroke },
    theme,
    shape,
    shadow,
    border,
  } = shapeCreationDesc;

  const [searchParams, setSearchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  const nodeControlSidebarOpen = searchParams.get("nodeControlSidebar");
  const {
    arrowEnd: edgeMarkerEnd,
    arrowStart: edgeMarkerStart,
    edgeCategory,
    fill: edgeFill,
    weight: edgeWeight,
    dash: edgeDash,
  } = menuDataEdge;

  const handleOpenNodeControlSidebar = useCallback(() => {
    searchParams.delete("sheetId");
    searchParams.delete("deckOpen");
    if (!searchParams.get("nodeControlSidebar")) {
      searchParams.append("nodeControlSidebar", "true");
      setSearchParams(searchParams);
    } else {
      searchParams.delete("nodeControlSidebar");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleOpenDeck = useCallback(() => {
    searchParams.delete("sheetId");
    searchParams.delete("nodeControlSidebar");
    if (!searchParams.get("deckOpen")) {
      searchParams.append("deckOpen", "true");
      setSearchParams(searchParams);
    } else {
      searchParams.delete("deckOpen");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleKeyboardEvent = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation();
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed && e.key === " ") {
        handleOpenDeck();
      }

      if (isCtrlPressed && (e.key === "q" || e.key === "Q")) {
        handleOpenNodeControlSidebar();
      }
    },
    [handleOpenDeck, handleOpenNodeControlSidebar]
  );

  const setEdgeFill = useCallback(
    (fillEdge: string) => {
      setMenuDataEdge({
        ...menuDataEdge,
        fill: fillEdge,
      });
    },
    [menuDataEdge, setMenuDataEdge]
  );

  const setEdgeMarkerEnd = useCallback(
    (arrow: ArrowEndType) => {
      setMenuDataEdge({
        ...menuDataEdge,
        arrowEnd: arrow,
      });
    },
    [menuDataEdge, setMenuDataEdge]
  );

  const setEdgeMarkerStart = useCallback(
    (arrow: ArrowEndType) => {
      setMenuDataEdge({
        ...menuDataEdge,
        arrowStart: arrow,
      });
    },
    [menuDataEdge, setMenuDataEdge]
  );

  const setEdgeCategory = useCallback(
    (newEdgeCategory: EdgeCategoryType) => {
      setMenuDataEdge({
        ...menuDataEdge,
        edgeCategory: newEdgeCategory,
      });
    },
    [menuDataEdge, setMenuDataEdge]
  );

  const setEdgeWeight = useCallback(
    (weightEdge: EdgeWeightType) => {
      setMenuDataEdge({
        ...menuDataEdge,
        weight: weightEdge,
      });
    },
    [menuDataEdge, setMenuDataEdge]
  );

  const setEdgeDash = useCallback(
    (dashEdge: EdgeDashType) => {
      setMenuDataEdge({
        ...menuDataEdge,
        dash: dashEdge,
      });
    },
    [menuDataEdge, setMenuDataEdge]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent);
    };
  });

  //Manage menu change selection
  useEffect(() => {
    const creationNodes = getCreationNode();
    if (mainToolbarActiveMenu === "CREATION-NODE") {
      setCreateNodeMode();
    } else if (creationNodes.length) {
      clearCreateNodeMode();
    }

    if (mainToolbarActiveMenu === "CREATION-GROUP") {
      setCreateGroupMode();
    } else if (creationNodes.length) {
      clearCreateGroupMode();
    }
  }, [
    mainToolbarActiveMenu,
    setCreateNodeMode,
    clearCreateNodeMode,
    setCreateGroupMode,
    clearCreateGroupMode,
    getCreationNode,
  ]);

  return (
    <CSSTransition
      in={sheetId === null}
      timeout={200}
      classNames={"main-toolbar"}
      unmountOnExit
    >
      <MenuToolbar
        $position={{
          left: "50%",
          bottom: "16px",
          transform: "translateX(-50%)",
        }}
      >
        <MenuToolbar.ActionLine>
          {/* Move viewport */}
          <MenuToolbar.ActionColumn>
            <MenuToolbar.Action
              border={MENU_BORDER_RIGHT}
              $padding="8px 16px 8px 16px"
              $active={mainToolbarActiveMenu === undefined}
              onClick={() => setMainToolbarActiveMenu(undefined)}
              toggle=""
            >
              <ToolbarSmallIcon>
                <RxMove size={"100%"} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>

            <MenuToolbar.Action
              border={MENU_BORDER_RIGHT}
              $padding="8px 16px 8px 16px"
              $active={mainToolbarActiveMenu === "SELECT"}
              onClick={() => setMainToolbarActiveMenu("SELECT")}
              toggle=""
            >
              <ToolbarSmallIcon>
                <RxGroup size={"100%"} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          </MenuToolbar.ActionColumn>

          {/* Sidebar (to list all nodes) */}
          <MenuToolbar.Action
            onClick={handleOpenNodeControlSidebar}
            $backgroundShadow={true}
          >
            <ToolbarAction>
              <ToolbarLargeIconContainer>
                <SidebarIcon />
              </ToolbarLargeIconContainer>
              <ToolbarAction.ActionButton
                $hoverTransform={
                  nodeControlSidebarOpen
                    ? "translateX(-8px)"
                    : "translateX(8px)"
                }
              >
                {!nodeControlSidebarOpen && <IoArrowForward />}
                {nodeControlSidebarOpen && <IoArrowBack />}
              </ToolbarAction.ActionButton>
            </ToolbarAction>
          </MenuToolbar.Action>

          {/* Deck (to create and edit flashcards) */}
          <MenuToolbar.Action
            border={MENU_BORDER_RIGHT}
            onClick={handleOpenDeck}
            $backgroundShadow={true}
          >
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
              <MenuToolbar.Action
                $padding="8px 4px 8px 16px"
                onClick={() => setMainToolbarActiveMenu("UPDATE-SHAPE")}
                $active={mainToolbarActiveMenu === "UPDATE-SHAPE"}
                toggle="shape"
              >
                <ToolbarSmallIcon>
                  <ShapesIcon />
                </ToolbarSmallIcon>
                <HiChevronUp size={12} />
              </MenuToolbar.Action>

              {/* Color of the shape */}
              <MenuToolbar.Action
                $padding="8px 4px 8px 8px"
                onClick={() => setMainToolbarActiveMenu("UPDATE-COLOR")}
                $active={mainToolbarActiveMenu === "UPDATE-COLOR"}
                toggle="color"
              >
                <ToolbarSmallIcon>
                  <ColorNodeIcon fill={fill} />
                </ToolbarSmallIcon>
                <HiChevronUp size={12} />
              </MenuToolbar.Action>
            </MenuToolbar.ActionLine>

            <MenuToolbar.ActionLine>
              {/* Border */}
              <MenuToolbar.Action
                $padding="8px 4px 8px 16px"
                onClick={() => setMainToolbarActiveMenu("UPDATE-BORDER")}
                $active={mainToolbarActiveMenu === "UPDATE-BORDER"}
                toggle="stroke"
              >
                <ToolbarSmallIcon>
                  <RxBorderAll size={"100%"} />
                </ToolbarSmallIcon>
                <HiChevronUp size={12} />
              </MenuToolbar.Action>

              {/* Shadow */}
              <MenuToolbar.Action
                $padding="8px 4px 8px 8px"
                onClick={() => setMainToolbarActiveMenu("UPDATE-SHADOW")}
                $active={mainToolbarActiveMenu === "UPDATE-SHADOW"}
                toggle="shadow"
              >
                <ToolbarSmallIcon>
                  <ShadowIcon />
                </ToolbarSmallIcon>
                <HiChevronUp size={12} />
              </MenuToolbar.Action>
            </MenuToolbar.ActionLine>
          </MenuToolbar.ActionColumn>

          {/* Create new shape */}
          <MenuToolbar.Action
            onClick={() => setMainToolbarActiveMenu("CREATION-NODE")}
            $active={mainToolbarActiveMenu === "CREATION-NODE"}
            toggle=""
            $backgroundShadow={true}
          >
            <ToolbarAction>
              <ToolbarLargeIconContainer>
                <ToolbarMediumIconContainer>
                  <ShapeDispatch
                    shape={shape}
                    fill={fill}
                    $shadow={shadow}
                    border={
                      border || themeId === "white-light" ? stroke : "none"
                    }
                  />
                </ToolbarMediumIconContainer>
              </ToolbarLargeIconContainer>
              <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
                <IoAdd size={24} />
              </ToolbarAction.ActionButton>
            </ToolbarAction>
          </MenuToolbar.Action>

          {/* Create new group */}
          <MenuToolbar.Action
            onClick={() => {
              setMainToolbarActiveMenu("CREATION-GROUP");
            }}
            $active={mainToolbarActiveMenu === "CREATION-GROUP"}
            toggle=""
            border={MENU_BORDER_RIGHT}
            $backgroundShadow={true}
          >
            <ToolbarAction>
              <ToolbarLargeIconContainer>
                <ToolbarMediumIconContainer>
                  <GroupIcon theme={theme} />
                </ToolbarMediumIconContainer>
              </ToolbarLargeIconContainer>
              <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
                <IoAdd size={24} />
              </ToolbarAction.ActionButton>
            </ToolbarAction>
          </MenuToolbar.Action>

          <MenuToolbar.ActionColumn>
            {/* Color of the shape */}
            <MenuToolbar.Action
              toggle="edge-color"
              $isAlignRight={true}
              $padding="8px 8px 8px 16px"
            >
              <ToolbarSmallIcon>
                <ColorNodeIcon fill={edgeFill} />
              </ToolbarSmallIcon>
              <HiChevronUp size={12} />
            </MenuToolbar.Action>
            <MenuToolbar.Action
              toggle="edge-category"
              $isAlignRight={true}
              $padding="8px 8px 8px 16px"
            >
              <ToolbarSmallIcon>
                <EdgeCategoryIcon edgeCategory={edgeCategory} />
              </ToolbarSmallIcon>
              <HiChevronUp size={12} />
            </MenuToolbar.Action>
          </MenuToolbar.ActionColumn>

          <MenuToolbar.ActionColumn>
            <MenuToolbar.Action toggle="edge-marker" $isAlignRight={true}>
              <ToolbarSmallIcon>
                <EdgeDoubleEndIcon />
              </ToolbarSmallIcon>
              <HiChevronUp size={12} />
            </MenuToolbar.Action>
            <MenuToolbar.Action toggle="edge-weight-dash" $isAlignRight={true}>
              <ToolbarSmallIcon>
                <EdgeWeightDashIcon />
              </ToolbarSmallIcon>
              <HiChevronUp size={12} />
            </MenuToolbar.Action>
          </MenuToolbar.ActionColumn>

          {/* Create new edge */}
          <MenuToolbar.Action
            onClick={() => setMainToolbarActiveMenu("CREATION-EDGE")}
            $active={mainToolbarActiveMenu === "CREATION-EDGE"}
            toggle=""
            $backgroundShadow={true}
          >
            <ToolbarAction>
              <EdgeIconContainer>
                <ToolbarMediumIconContainer>
                  <EdgeIcon edgeCategory={edgeCategory} fill={edgeFill} markerStart={edgeMarkerStart} markerEnd={edgeMarkerEnd} edgeDash={edgeDash as EdgeDashType}/>
                </ToolbarMediumIconContainer>
              </EdgeIconContainer>
              <ToolbarAction.ActionButton $hoverTransform="scale(1.2)">
                <IoAdd size={24} />
              </ToolbarAction.ActionButton>
            </ToolbarAction>
          </MenuToolbar.Action>
        </MenuToolbar.ActionLine>

        <MenuToolbar.SubMenu name="shape">
          <MenuToolbar.ActionLine>
            {ShapeMenu.map((shapeMenu) => (
              <MenuToolbar.Action
                key={shapeMenu}
                $active={shape === shapeMenu}
                onClick={() => {
                  setShapeCreationDesc({
                    ...shapeCreationDesc,
                    shape: shapeMenu,
                  });
                }}
              >
                <ShapeContainer>
                  <ShapeDispatch
                    shape={shapeMenu}
                    fill={fill}
                    $shadow="var(--shadow-shape-menu-md)"
                  />
                </ShapeContainer>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
        </MenuToolbar.SubMenu>

        <MenuToolbar.SubMenu name="color">
          <MenuToolbar.ActionLine>
            {THEMES_DARK.map((themeDark) => (
              <MenuToolbar.Action
                key={themeDark.fill}
                $active={fill === themeDark.fill}
                onClick={() => {
                  setShapeCreationDesc({
                    ...shapeCreationDesc,
                    theme: themeDark,
                  });
                }}
              >
                <ToolbarSmallIcon>
                  <ColorNodeIcon fill={themeDark.fill} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
          <MenuToolbar.ActionLine>
            {THEME_LIGHT.map((themeLight) => (
              <MenuToolbar.Action
                key={themeLight.fill}
                $active={fill === themeLight.fill}
                onClick={() => {
                  setShapeCreationDesc({
                    ...shapeCreationDesc,
                    theme: themeLight,
                  });
                }}
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
            {SHADOWS_MENU.map((shadowsMenu) => (
              <MenuToolbar.Action
                key={shadowsMenu.shadow}
                $active={shadow === shadowsMenu.shadow}
                onClick={() => {
                  setShapeCreationDesc({
                    ...shapeCreationDesc,
                    shadow: shadowsMenu.shadow,
                  });
                }}
              >
                <ToolbarSmallIcon>
                  <ShadowDiv shadow={shadowsMenu.shadowMenu} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
        </MenuToolbar.SubMenu>

        <MenuToolbar.SubMenu name="stroke">
          <MenuToolbar.ActionLine>
            <MenuToolbar.Action
              $active={!border}
              onClick={() => {
                setShapeCreationDesc({
                  ...shapeCreationDesc,
                  border: false,
                });
              }}
            >
              <ToolbarSmallIcon>
                <RxBorderNone size={"100%"} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
            <MenuToolbar.Action
              $active={border}
              onClick={() => {
                setShapeCreationDesc({
                  ...shapeCreationDesc,
                  border: true,
                });
              }}
            >
              <ToolbarSmallIcon>
                <RxBorderAll size={"100%"} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          </MenuToolbar.ActionLine>
        </MenuToolbar.SubMenu>

        <MenuToolbar.SubMenu name="edge-color" $alignRight={true}>
          <MenuToolbar.ActionLine>
            {EDGE_COLORS.map((fillEdge) => (
              <MenuToolbar.Action
                key={fillEdge}
                $active={fillEdge === edgeFill}
                onClick={() => setEdgeFill(fillEdge)}
              >
                <ToolbarSmallIcon>
                  <ColorNodeIcon fill={fillEdge} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
        </MenuToolbar.SubMenu>

        <MenuToolbar.SubMenu name="edge-category" $alignRight={true}>
          <MenuToolbar.ActionLine>
            {EdgeCategoryArray.map((cat) => (
              <MenuToolbar.Action
                key={cat}
                $active={edgeCategory === cat}
                onClick={() => setEdgeCategory(cat)}
              >
                <ToolbarSmallIcon>
                  <EdgeCategoryIcon edgeCategory={cat} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
        </MenuToolbar.SubMenu>

        <MenuToolbar.SubMenu name="edge-marker" $alignRight={true}>
          <MenuToolbar.ActionLine>
            {ArrowEndArray.map((arrow) => (
              <MenuToolbar.Action
                key={arrow}
                $active={arrow === edgeMarkerStart}
                onClick={() => setEdgeMarkerStart(arrow)}
              >
                <ToolbarSmallIcon>
                  <ArrowEndIcon arrow={arrow} flip={true} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
            {ArrowEndArray.reverse().map((arrow, index) => (
              <MenuToolbar.Action
                key={arrow}
                border={index === 0 ? MENU_BORDER_LEFT : {}}
                $active={arrow === edgeMarkerEnd}
                onClick={() => setEdgeMarkerEnd(arrow)}
              >
                <ToolbarSmallIcon>
                  <ArrowEndIcon arrow={arrow} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
        </MenuToolbar.SubMenu>

        <MenuToolbar.SubMenu name="edge-weight-dash" $alignRight={true}>
          <MenuToolbar.ActionLine>
            {EdgeWeightArray.map((strokeWeight) => (
              <MenuToolbar.Action
                key={strokeWeight}
                $active={edgeWeight === strokeWeight}
                onClick={() => setEdgeWeight(strokeWeight)}
              >
                <ToolbarSmallIcon>
                  <EdgeWeightIcon weight={strokeWeight} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
            {EDGE_DASH_ARRAY.map((dashEdge, index) => (
              <MenuToolbar.Action
                key={dashEdge}
                border={index === 0 ? MENU_BORDER_LEFT : {}}
                $active={edgeDash === dashEdge}
                onClick={() => setEdgeDash(dashEdge)}
              >
                <ToolbarSmallIcon>
                  <EdgeDashIcon dash={dashEdge} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
        </MenuToolbar.SubMenu>
      </MenuToolbar>
    </CSSTransition>
  );
}

export default MainToolbar;
