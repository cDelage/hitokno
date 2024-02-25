import { MouseEvent, useCallback } from "react";
import { BiDetail } from "react-icons/bi";
import styled, { css } from "styled-components";
import useCartography from "./useCartography";
import { useReactFlow, useViewport } from "reactflow";
import { useSearchParams } from "react-router-dom";

const SheetButton = styled.div<{
  $isActive: boolean;
  $activeColor: string;
  $defaultColor: string;
}>`
  position: absolute;
  z-index: 200;
  top: 4px;
  right: 4px;
  cursor: pointer;
  ${(props) =>
    props.$isActive
      ? css`
          color: ${props.$activeColor};
        `
      : css`
          color: ${props.$defaultColor};
        `}
`;

function SheetSignifiantButton({
  nodeSheetId,
  nodeId,
  $activeColor,
  $defaultColor,
}: {
  nodeSheetId: string;
  nodeId: string;
  $defaultColor: string;
  $activeColor: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { zoom } = useViewport();
  const { setCenter } = useReactFlow();

  const active = nodeSheetId === searchParams.get("sheetId");

  const { getNodeCenterCoordinate } = useCartography();
  const handleOpenSheet = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
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
    },
    [
      setSearchParams,
      setCenter,
      zoom,
      nodeId,
      getNodeCenterCoordinate,
      nodeSheetId,
      active,
      searchParams,
    ]
  );

  return (
    <SheetButton
      onClick={handleOpenSheet}
      $isActive={active}
      $activeColor={$activeColor}
      $defaultColor={$defaultColor}
    >
      <BiDetail size={`20px`} />
    </SheetButton>
  );
}

export default SheetSignifiantButton;
