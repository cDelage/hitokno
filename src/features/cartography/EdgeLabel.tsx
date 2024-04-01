import { useReactFlow, useViewport } from "reactflow";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { PositionAbsolute } from "../../types/Position.type";
import styled, { css } from "styled-components";
import { DataEdge, NodeMode } from "../../types/Cartography.type";
import ShapeDispatch from "./shapes/ShapeDispatch";
import TextAreaEditable from "../../ui/TextAreaEditable";
import useCartography from "./useCartography";
import { createPortal } from "react-dom";
import { measureText } from "../../utils/measureText";

const LabelContainer = styled.div<{
  $position: PositionAbsolute;
  $width: number;
  $height: number;
  $zoom: number;
  $selected: boolean
}>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  position: absolute;
  display: flex;
  box-sizing: border-box;
  padding: 8px;
  transform: translate(-50%, -50%) scale(${(props) => props.$zoom});
  ${(props) => {
    return { ...props.$position };
  }};

  ${(props) => props.$selected && css`
    border: 1px solid #0284C7;
    overflow: hidden;
  `};
  
`;

const TopContainer = styled.div<{
  $mode: NodeMode;
  $color: string;
  $selectionColor: string;
}>`
  z-index: 1;
  flex-grow: 1;
  color: ${(props) => props.$color};
  ${(props) =>
    props.$mode === "DEFAULT" &&
    css`
      cursor: pointer;
    `}

  ::selection {
    background-color: ${(props) => props.$selectionColor};
    color: ${(props) => props.$color};
  }
`;

function EdgeLabel({
  id,
  data,
  labelX,
  labelY,
  selected
}: {
  id: string;
  data: DataEdge;
  labelX: number;
  labelY: number;
  selected: boolean
}) {
  const { flowToScreenPosition } = useReactFlow();
  const { setEdgeData, toggleEditMode } = useCartography();
  const { zoom, x, y } = useViewport();
  const { shapeDescription, label, mode } = data;
  const { shape, border, shadow, theme, width, height } = shapeDescription;

  const [labelCopy, setLabelCopy] = useState(label ? label : "");

  const handleDoubleClick = useCallback(() => {
    if (mode !== "EDIT") {
      toggleEditMode(id);
    }
  }, [toggleEditMode, mode, id]);

  const position = useMemo<PositionAbsolute>(() => {
    if (zoom !== undefined && x !== undefined && y !== undefined) {
      const pos = flowToScreenPosition({
        x: labelX,
        y: labelY,
      });

      return {
        top: pos.y,
        left: pos.x,
      };
    }
    return {};
  }, [flowToScreenPosition, labelX, labelY, zoom, x, y]);

  const updateEdgeDataLabel = useCallback(
    async (label: string) => {
      const { height, width } = measureText(label);
      setEdgeData(id, {
        ...data,
        label,
        shapeDescription: {
          ...data.shapeDescription,
          width,
          height,
        },
      });
    },
    [setEdgeData, id, data]
  );

  const updateLabel = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setLabelCopy(e.target.value);
      updateEdgeDataLabel(e.target.value);
    },
    [setLabelCopy, updateEdgeDataLabel]
  );

  return createPortal(
    <LabelContainer
      $position={position}
      $height={height}
      $width={width}
      $zoom={zoom}
      $selected={selected}
    >
      <ShapeDispatch
        shape={shape}
        fill={theme.fill}
        $shadow={shadow}
        border={border ? theme.stroke : undefined}
      />
      <TopContainer
        onDoubleClick={handleDoubleClick}
        $mode={mode}
        $color={theme.color}
        $selectionColor={theme.selection}
      >
        <TextAreaEditable
          mode={mode}
          onEdit={updateLabel}
          value={labelCopy}
          overflow="hidden"
        />
      </TopContainer>
    </LabelContainer>,
    document.body
  );
}

export default EdgeLabel;
