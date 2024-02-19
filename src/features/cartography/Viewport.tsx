import ReactFlow, {
  Background,
  BackgroundVariant,
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
  const { nodes, edges, onNodesChange, setShowNodeToolbar } = useCartography();
  const { zoom } = useViewport();
  const { clearPositionToolbar } = useNodeToolbar();
  //Check mode
  //const { getCartographyMode } = useTabs();
  //const {fileId} = useParams();
  //const mode : CartographyMode = fileId ? getCartographyMode(fileId) : "DEFAULT";

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      console.log("CHANGE");
      if (nodes.length === 1) {
        setShowNodeToolbar(nodes[0].id);
      }
    },
  });

  useEffect(() => {
    if (!nodes.find((node) => node.selected)) {
      clearPositionToolbar();
    }
  }, [nodes, clearPositionToolbar, setShowNodeToolbar]);

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
        snapGrid={[8, 8]}
        panOnScroll
        selectionOnDrag
        minZoom={1}
        maxZoom={2.5}
        fitView
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
