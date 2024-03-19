import { NodeResizer, useViewport } from "reactflow";
import { CSSProperties } from "styled-components";
import { PX_UNIT_GAP } from "./CartographyConstants";
import useCartography from "./useCartography";

const ResizerHandleStyle: CSSProperties = {
  borderRadius: "2px",
  border: "#0284C7 1px solid",
  backgroundColor: "white",
  boxSizing: "border-box",
  transform: "translate(-50%,-50%) scale(1)",
  boxShadow: "var(--shadow-md)",
};

const ResizerBorderStyle: CSSProperties = {
  border: "none",
  backgroundColor: "#0284C7",
  boxSizing: "border-box",
};

function Resizer({
  selected,
  keepAspectRatio,
  id,
}: {
  selected: boolean;
  keepAspectRatio?: boolean;
  id: string;
}) {
  const { zoom } = useViewport();
  const { addSameSizeHelperLines, addHelperLines, handleDragStop: clearHelpers } = useCartography();
  const NodeResizerStyle: CSSProperties = {
    ...ResizerHandleStyle,
    width: `${16 / zoom}px`,
    height: `${16 / zoom}px`,
  };

  return (
    <NodeResizer
      minWidth={PX_UNIT_GAP * 2}
      minHeight={PX_UNIT_GAP * 2}
      handleStyle={NodeResizerStyle}
      lineStyle={ResizerBorderStyle}
      isVisible={selected}
      keepAspectRatio={keepAspectRatio}
      onResizeStart={() => addHelperLines(id)}
      onResize={(_e, resize) =>
        addSameSizeHelperLines(id, {
          width: resize.width,
          height: resize.height,
        })
      }
      onResizeEnd={clearHelpers}
    />
  );
}

export default Resizer;
