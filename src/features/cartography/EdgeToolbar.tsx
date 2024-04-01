import { useCallback, useMemo } from "react";
import MenuToolbar from "../../ui/MenuToolbar";
import { useReactFlow, useViewport } from "reactflow";
import { PositionAbsolute } from "../../types/Position.type";
import { ToolbarSmallIcon } from "../../ui/ToolbarSmallIcon";
import ColorNodeIcon from "../../ui/icons/ColorNodeIcon";
import { HiChevronUp } from "react-icons/hi2";
import EdgeLabelIcon from "../../ui/icons/EdgeLabelIcon";
import {
  ArrowEndArray,
  EDGE_COLORS,
  EDGE_DASH_ARRAY,
  EDGE_LABEL_SHADOWS_MENU,
  EdgeCategoryArray,
  EdgeWeightArray,
  MENU_BORDER_LEFT,
  MENU_BORDER_RIGHT,
  ShapeEdge,
  ThemeDarkEdgeLabel,
  ThemeLightEdgeLabel,
} from "./CartographyConstants";
import EdgeWeightIcon from "../../ui/icons/EdgeWeightIcon";
import ArrowEndIcon from "../../ui/icons/ArrowEndIcon";
import EdgeCategoryIcon from "../../ui/icons/EdgeCategoryIcon";
import styled from "styled-components";
import { RxBorderAll, RxBorderNone } from "react-icons/rx";
import { BiPen, BiTrash } from "react-icons/bi";
import {
  ArrowEndType,
  DataEdge,
  EdgeCategoryType,
  EdgeDashType,
  EdgeWeightType,
  Shadow,
  Shape,
  Theme,
} from "../../types/Cartography.type";
import useCartography from "./useCartography";
import DashIcon from "../../ui/icons/DashIcon";
import WeightIcon from "../../ui/icons/WeightIcon";
import EdgeDashIcon from "../../ui/icons/EdgeDashIcon";
import { IoMdAdd } from "react-icons/io";
import ShapeDispatch from "./shapes/ShapeDispatch";

const ShadowDiv = styled.div<{ shadow?: string }>`
  height: 24px;
  width: 24px;
  border-radius: 4px;
  background-color: var(--color-gray-100);
  border: solid 2px var(--color-gray-300);
  box-shadow: ${(props) => props.shadow};
`;

const ShapeContainer = styled.div`
  height: 20px;
  width: 20px;
  overflow: visible;
  position: relative;
`;


function EdgeToolbar({
  labelX,
  labelY,
  data,
  height,
  id,
}: {
  labelX: number;
  labelY: number;
  height: number;
  data: DataEdge;
  id: string;
}) {
  const { zoom, x, y } = useViewport();
  const { flowToScreenPosition } = useReactFlow();
  const { setEdgeData, toggleEditMode } = useCartography();
  const {
    fill,
    arrowEnd,
    arrowStart,
    edgeCategory,
    weight,
    dash,
    label,
    shapeDescription,
    mode
  } = data;

  const { theme, border, shadow, shape } = shapeDescription;

  const position = useMemo<PositionAbsolute>(() => {
    if (zoom !== undefined && x !== undefined && y !== undefined) {
      const pos = flowToScreenPosition({
        x: labelX,
        y: labelY - height / 2,
      });

      return {
        top: pos.y,
        left: pos.x,
        transform: "translate(-50%,-120%)",
      };
    }
    return {};
  }, [flowToScreenPosition, labelX, labelY, zoom, x, y, height]);

  const handleFillEdge = useCallback(
    (fillEdge: string) => {
      setEdgeData(id, {
        ...data,
        fill: fillEdge,
      });
    },
    [setEdgeData, data, id]
  );

  const handleSetArrowEnd = useCallback(
    (arrow: ArrowEndType) => {
      setEdgeData(id, {
        ...data,
        arrowEnd: arrow,
      });
    },
    [setEdgeData, data, id]
  );

  const handleSetArrowStart = useCallback(
    (arrow: ArrowEndType) => {
      setEdgeData(id, {
        ...data,
        arrowStart: arrow,
      });
    },
    [setEdgeData, data, id]
  );

  const handleSetEdgeCategory = useCallback(
    (newEdgeCategory: EdgeCategoryType) => {
      setEdgeData(id, {
        ...data,
        edgeCategory: newEdgeCategory,
      });
    },
    [setEdgeData, data, id]
  );

  const handleSetEdgeWeight = useCallback(
    (weightEdge: EdgeWeightType) => {
      setEdgeData(id, {
        ...data,
        weight: weightEdge,
      });
    },
    [setEdgeData, data, id]
  );

  const handleSetDash = useCallback(
    (dashEdge: EdgeDashType) => {
      setEdgeData(id, {
        ...data,
        dash: dashEdge,
      });
    },
    [setEdgeData, data, id]
  );

  const handleCreateLabel = useCallback(() => {
    setEdgeData(id, {
      ...data,
      label: "LABEL",
      shapeDescription: {
        ...data.shapeDescription,
        width: 80,
        height: 40
      }
    });
  }, [setEdgeData, id, data]);

  const handleRemoveLabel = useCallback(() => {
    setEdgeData(id, {
      ...data,
      label: undefined,
    });
  }, [setEdgeData, id, data]);

  const handleSetLabelTheme = useCallback(
    (theme: Theme) => {
      setEdgeData(id, {
        ...data,
        shapeDescription: {
          ...data.shapeDescription,
          theme,
        },
      });
    },
    [setEdgeData, id, data]
  );

  const handleSetLabelBorder = useCallback(
    (border: boolean) => {
      setEdgeData(id, {
        ...data,
        shapeDescription: {
          ...data.shapeDescription,
          border,
        },
      });
    },
    [setEdgeData, id, data]
  );

  const handleSetLabelShadow = useCallback(
    (shadow: Shadow) => {
      setEdgeData(id, {
        ...data,
        shapeDescription: {
          ...data.shapeDescription,
          shadow,
        },
      });
    },
    [setEdgeData, id, data]
  );
  
  const handleSetLabelShape = useCallback(
    (shape: Shape) => {
      setEdgeData(id, {
        ...data,
        shapeDescription: {
          ...data.shapeDescription,
          shape,
        },
      });
    },
    [setEdgeData, id, data]
  );

  return (
    <MenuToolbar $position={position}>
      <MenuToolbar.ActionLine>
        <MenuToolbar.Action $padding="8px 4px 8px 8px" toggle="color">
          <ToolbarSmallIcon>
            <ColorNodeIcon fill={fill} />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>
        <MenuToolbar.Action toggle="weight">
          <ToolbarSmallIcon>
            <WeightIcon />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>
        <MenuToolbar.Action toggle="dash" border={MENU_BORDER_RIGHT}>
          <ToolbarSmallIcon>
            <DashIcon />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>
        <MenuToolbar.Action toggle="arrow-end-left">
          <ToolbarSmallIcon>
            <ArrowEndIcon arrow={arrowStart} flip={true} />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>
        <MenuToolbar.Action toggle="edge-category">
          <ToolbarSmallIcon>
            <EdgeCategoryIcon edgeCategory={edgeCategory} />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>
        <MenuToolbar.Action
          border={MENU_BORDER_RIGHT}
          toggle="arrow-end-right"
          $isAlignRight={true}
        >
          <ToolbarSmallIcon>
            <ArrowEndIcon arrow={arrowEnd} />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>
        {label && (
          <MenuToolbar.Action
          onClick={() => {
            toggleEditMode(id);
          }}
          $active={mode === "EDIT"}
        >
          <ToolbarSmallIcon>
            <BiPen size={"100%"} />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>
        )}
        {!label && (
          <MenuToolbar.Action $isAlignRight={true} onClick={handleCreateLabel}>
            <ToolbarSmallIcon>
              <EdgeLabelIcon />
            </ToolbarSmallIcon>
            <IoMdAdd size={12} />
          </MenuToolbar.Action>
        )}
        {label && (
          <MenuToolbar.Action toggle="label" $isAlignRight={true}>
            <ToolbarSmallIcon>
              <EdgeLabelIcon />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        )}
      </MenuToolbar.ActionLine>

      <MenuToolbar.SubMenu name="weight">
        <MenuToolbar.ActionLine>
          {EdgeWeightArray.map((strokeWeight) => (
            <MenuToolbar.Action
              key={strokeWeight}
              $active={weight === strokeWeight}
              onClick={() => handleSetEdgeWeight(strokeWeight)}
            >
              <ToolbarSmallIcon>
                <EdgeWeightIcon weight={strokeWeight} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="arrow-end-left">
        <MenuToolbar.ActionLine>
          {ArrowEndArray.map((arrow) => (
            <MenuToolbar.Action
              key={arrow}
              $active={arrowStart === arrow}
              onClick={() => handleSetArrowStart(arrow)}
            >
              <ToolbarSmallIcon>
                <ArrowEndIcon arrow={arrow} flip={true} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="arrow-end-right" $alignRight={true}>
        <MenuToolbar.ActionLine>
          {ArrowEndArray.map((arrow) => (
            <MenuToolbar.Action
              key={arrow}
              $active={arrowEnd === arrow}
              onClick={() => handleSetArrowEnd(arrow)}
            >
              <ToolbarSmallIcon>
                <ArrowEndIcon arrow={arrow} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="edge-category">
        <MenuToolbar.ActionLine>
          {EdgeCategoryArray.map((edge) => (
            <MenuToolbar.Action
              key={edge}
              $active={edge === edgeCategory}
              onClick={() => handleSetEdgeCategory(edge)}
            >
              <ToolbarSmallIcon>
                <EdgeCategoryIcon edgeCategory={edge} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="label" $alignRight={true}>
        <MenuToolbar.ActionLine>
          <MenuToolbar.ActionColumn>
            <MenuToolbar.ActionLine>
              {ThemeDarkEdgeLabel.map((themeDark) => (
                <MenuToolbar.Action
                  key={themeDark.fill}
                  $active={theme.id === themeDark.id}
                  onClick={() => handleSetLabelTheme(themeDark)}
                >
                  <ToolbarSmallIcon>
                    <ColorNodeIcon fill={themeDark.fill} />
                  </ToolbarSmallIcon>
                </MenuToolbar.Action>
              ))}
            </MenuToolbar.ActionLine>
            <MenuToolbar.ActionLine>
              {ThemeLightEdgeLabel.map((themeLight) => (
                <MenuToolbar.Action
                  key={themeLight.fill}
                  $active={theme.id === themeLight.id}
                  onClick={() => handleSetLabelTheme(themeLight)}
                >
                  <ToolbarSmallIcon>
                    <ColorNodeIcon fill={themeLight.fill} />
                  </ToolbarSmallIcon>
                </MenuToolbar.Action>
              ))}
            </MenuToolbar.ActionLine>
          </MenuToolbar.ActionColumn>

          <MenuToolbar.ActionColumn>
            <MenuToolbar.Action
              border={MENU_BORDER_LEFT}
              onClick={() => handleSetLabelBorder(false)}
              $active={!border}
            >
              <ToolbarSmallIcon>
                <RxBorderNone size={"100%"} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
            <MenuToolbar.Action
              onClick={() => handleSetLabelBorder(true)}
              $active={border}
              border={MENU_BORDER_LEFT}
            >
              <ToolbarSmallIcon>
                <RxBorderAll size={"100%"} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          </MenuToolbar.ActionColumn>

          <MenuToolbar.ActionColumn>
            {EDGE_LABEL_SHADOWS_MENU.map((shadowItem) => (
              <MenuToolbar.Action
                key={shadowItem.shadow}
                border={MENU_BORDER_LEFT}
                $active={shadow === shadowItem.shadow}
                onClick={() => handleSetLabelShadow(shadowItem.shadow)}
              >
                <ToolbarSmallIcon>
                  <ShadowDiv shadow={shadowItem.shadowMenu} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionColumn>
          <MenuToolbar.ActionColumn>
          {ShapeEdge.map((shapeMenu) => (
            <MenuToolbar.Action
              key={shapeMenu}
              $active={shape === shapeMenu}
              onClick={() => handleSetLabelShape(shapeMenu)}
            >
              <ShapeContainer>
                <ShapeDispatch
                  shape={shapeMenu}
                  fill="var(--color-gray-400"
                  $shadow="var(--shadow-shape-menu-md)"
                />
              </ShapeContainer>
            </MenuToolbar.Action>
          ))}
          </MenuToolbar.ActionColumn>
          <MenuToolbar.Action onClick={handleRemoveLabel} toggle="label">
            <BiTrash size={28} />
          </MenuToolbar.Action>
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="color">
        <MenuToolbar.ActionLine>
          {EDGE_COLORS.map((fillEdge) => (
            <MenuToolbar.Action
              key={fillEdge}
              $active={fillEdge === fill}
              onClick={() => handleFillEdge(fillEdge)}
            >
              <ToolbarSmallIcon>
                <ColorNodeIcon fill={fillEdge} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>
      <MenuToolbar.SubMenu name="dash">
        <MenuToolbar.ActionLine>
          {EDGE_DASH_ARRAY.map((dashEdge) => (
            <MenuToolbar.Action
              key={dashEdge}
              onClick={() => handleSetDash(dashEdge)}
              $active={dash === dashEdge}
            >
              <ToolbarSmallIcon>
                <EdgeDashIcon dash={dashEdge} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>
    </MenuToolbar>
  );
}

export default EdgeToolbar;
