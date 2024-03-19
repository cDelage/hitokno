import { MouseEvent, useCallback, useEffect } from "react";
import { BiDetail } from "react-icons/bi";
import styled, { css } from "styled-components";
import useCartography from "./useCartography";
import { useReactFlow, useViewport } from "reactflow";
import { useSearchParams } from "react-router-dom";
import useNodeToolbar from "./useNodeToolbar";

const SheetButton = styled.div<{ $isActive: boolean }>`
  position: absolute;
  z-index: 1000;
  top: 8px;
  right: 0px;
  cursor: pointer;
  color: white;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: rgba(12, 6, 15, 0.5);
  backdrop-filter: blur(2px);

  ${(props) =>
    props.$isActive
      ? css`
          padding: 4px 16px 4px 2px;
          background-color: rgba(12, 6, 15, 0.8);
        `
      : css`
          padding: 4px 8px 4px 2px;
        `}
`;

function SheetSignifiantButton({
  nodeSheetId,
  nodeId,
}: {
  nodeSheetId: string;
  nodeId: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { zoom } = useViewport();
  const { setCenter } = useReactFlow();
  const { selectedNodeId } = useNodeToolbar();
  const active = nodeSheetId === searchParams.get("sheetId");

  const { getNodeCenterCoordinate } = useCartography();
  const handleOpenSheet = useCallback(() => {
    if (!active) {
      const centerNode = getNodeCenterCoordinate(nodeId);
      const gapXScreen = (window.innerWidth - 800) / 2 / zoom;
      const newXPos = centerNode.x + gapXScreen;

      setCenter(newXPos, centerNode.y, { duration: 200, zoom });
      setSearchParams({ sheetId: nodeSheetId });
    } else {
      const centerNode = getNodeCenterCoordinate(nodeId);
      setCenter(centerNode.x, centerNode.y, { duration: 200, zoom });
      searchParams.delete("sheetId");
      setSearchParams(searchParams);
    }
  }, [
    setSearchParams,
    setCenter,
    zoom,
    nodeId,
    getNodeCenterCoordinate,
    nodeSheetId,
    active,
    searchParams,
  ]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      handleOpenSheet();
    },
    [handleOpenSheet]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed && (e.key === "O"||e.key === "o")) {
        handleOpenSheet();
      }
    },
    [handleOpenSheet]
  );

  useEffect(() => {
    if (selectedNodeId === nodeId) {
      document.addEventListener("keydown", handleKeydown);
    } else {
      document.removeEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [selectedNodeId, handleKeydown, nodeId, active]);

  return (
    <SheetButton onClick={handleClick} $isActive={active}>
      <BiDetail size={`20px`} />
    </SheetButton>
  );
}

export default SheetSignifiantButton;
