import MenuToolbar from "../../ui/MenuToolbar";
import { ToolbarSmallIcon } from "../../ui/ToolbarSmallIcon";
import ColorNodeIcon from "../../ui/icons/ColorNodeIcon";
import {
  DataNode,
  ShapeDescription,
  SheetToolbarMode,
  Theme,
} from "../../types/Cartography.type";
import { HiChevronUp } from "react-icons/hi2";
import { ThemeLight, ThemesDark } from "./CartographyConstants";
import useCartography from "./useCartography";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useReactFlow, useViewport } from "reactflow";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import SheetIcon from "../../ui/icons/SheetIcon";
import CenterDivContainer from "../../ui/CenterDivContainer";

function GroupToolbar({ data, nodeId }: { data: DataNode; nodeId: string }) {
  const { shapeDescription, sheet } = data;
  const { theme } = shapeDescription as ShapeDescription;
  const { setNodeData, getNodeCenterCoordinate } = useCartography();
  const { zoom } = useViewport();
  const { setCenter } = useReactFlow();
  const [searchParams, setSearchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  const IconContainerLarge = styled.div`
    height: 28px;
    width: 52px;
    overflow: visible;
    display: flex;
    align-items: center;
  `;

  const handleSetTheme = useCallback(
    (theme: Theme) => {
      console.log("setTheme", theme);
      setNodeData(nodeId, {
        ...data,
        shapeDescription: {
          ...(data.shapeDescription as ShapeDescription),
          theme,
        },
      });
    },
    [data, nodeId, setNodeData]
  );

  const handleCreateSheet = useCallback(() => {
    setNodeData(nodeId, {
      ...data,
      sheet: {
        sheetId: uuidv4(),
      },
    });
  }, [setNodeData, data, nodeId]);

  const handleOpenSheet = useCallback(
    (sheetId: string) => {
      const centerNode = getNodeCenterCoordinate(nodeId);
      const gapXScreen = (window.innerWidth - 800) / 2 / zoom;
      const newXPos = centerNode.x + gapXScreen;

      setCenter(newXPos, centerNode.y, { duration: 200, zoom });
      setSearchParams({ sheetId });
    },
    [setSearchParams, setCenter, zoom, nodeId, getNodeCenterCoordinate]
  );

  const handleCloseSheet = useCallback(() => {
    const centerNode = getNodeCenterCoordinate(nodeId);
    setCenter(centerNode.x, centerNode.y, { duration: 200, zoom });
    searchParams.delete("sheetId");
    setSearchParams(searchParams);
  }, [
    setSearchParams,
    searchParams,
    setCenter,
    getNodeCenterCoordinate,
    nodeId,
    zoom,
  ]);

  const sheetMode: SheetToolbarMode = sheet
    ? sheetId === sheet.sheetId
      ? "CLOSE"
      : "OPEN"
    : "CREATE";

  function sheetCallback() {
    if (sheetMode === "CREATE") {
      handleCreateSheet();
    } else if (sheetMode === "CLOSE") {
      handleCloseSheet();
    } else if (sheetMode === "OPEN") {
      handleOpenSheet(sheet?.sheetId as string);
    }
  }

  return (
    <CenterDivContainer>
      <MenuToolbar
        $position={{
          top: 0,
          left: 0,
          transform: "translate(-50%,-120%)",
        }}
        underRelative={true}
      >
        <MenuToolbar.ActionLine>
          <MenuToolbar.Action $padding="8px 4px 8px 8px" toggle="color">
            <ToolbarSmallIcon>
              <ColorNodeIcon fill={theme.fill} />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
          {/* Open sheet */}
          <MenuToolbar.Action onClick={sheetCallback}>
            <IconContainerLarge>
              <SheetIcon mode={sheetMode} />
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
      </MenuToolbar>
    </CenterDivContainer>
  );
}

export default GroupToolbar;
