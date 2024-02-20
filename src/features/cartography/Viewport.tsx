import ReactFlow, {
  Background,
  BackgroundVariant,
  SelectionMode,
  useOnSelectionChange,
  useViewport,
} from "reactflow";
import useCartography from "./useCartography";
import styled from "styled-components";
import { NodeCustomsComponents, PX_UNIT_GAP } from "./CartographyConstants";
import NodeToolbar from "./NodeToolbar";
import useNodeToolbar from "./useNodeToolbar";
import { useEffect } from "react";
import MainToolbar from "./MainToolbar";

const ViewportContainer = styled.div`
  flex-grow: 1;
`;

function Viewport(): JSX.Element {
  const {
    nodes,
    edges,
    onNodesChange,
    setShowNodeToolbar,
    panOnDragMode,
    mainToolbarActiveMenu,
    setPanOnDragMode,
  } = useCartography();
  const { zoom } = useViewport();
  const { clearPositionToolbar } = useNodeToolbar();

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      console.log("CHANGE");
      if (nodes.length === 1) {
        setShowNodeToolbar(nodes[0].id);
      }
    },
  });

  //Clear node toolbar when no nodes are selected
  useEffect(() => {
    if (!nodes.find((node) => node.selected)) {
      clearPositionToolbar();
    }
  }, [nodes, clearPositionToolbar, setShowNodeToolbar]);

  //Manage panOnDragMode (scroll, zoom, etc...) by regarding MainToolbar menu selected
  useEffect(() => {
    if (mainToolbarActiveMenu === "SELECT") {
      setPanOnDragMode([1, 2]);
    } else if (mainToolbarActiveMenu === "CREATION-NODE") {
      setPanOnDragMode([2]);
    } else {
      setPanOnDragMode(undefined);
    }
  }, [mainToolbarActiveMenu, setPanOnDragMode]);

  return (
    <ViewportContainer>
      <NodeToolbar />
      <MainToolbar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={NodeCustomsComponents}
        snapToGrid={true}
        fitView
        snapGrid={[8, 8]}
        panOnScroll
        selectionOnDrag
        panOnDrag={panOnDragMode}
        selectionMode={SelectionMode.Full}
        minZoom={1}
        maxZoom={2.5}
      >
        {zoom > 1.5 && (
          <>
            <Background
              variant={"lines" as BackgroundVariant}
              color={"#BAE6FD"}
              gap={PX_UNIT_GAP}
              size={1}
              id="back"
            />
            <Background
              variant={"lines" as BackgroundVariant}
              color="#BAE6FD"
              gap={PX_UNIT_GAP * 4}
              size={1}
              id="top"
            />
          </>
        )}
        {zoom < 1.5 && (
          <>
            <Background
              variant={"lines" as BackgroundVariant}
              color={"#BAE6FD"}
              gap={PX_UNIT_GAP * 2}
              size={1}
              id="back"
            />
            <Background
              variant={"lines" as BackgroundVariant}
              color="#BAE6FD"
              gap={PX_UNIT_GAP * 8}
              size={1}
              id="top"
            />
          </>
        )}
      </ReactFlow>
    </ViewportContainer>
  );
}

export default Viewport;
