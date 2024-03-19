import ReactFlow, {
  Background,
  BackgroundVariant,
  EdgeTypes,
  MiniMap,
  NodeChange,
  SelectionMode,
  useViewport,
} from "reactflow";
import useCartography from "./useCartography";
import styled from "styled-components";
import {
  DEFAULT_EDGE_OPTIONS,
  EDGE_TYPE_COMPONENT,
  InitialEdgeCreationState,
  NodeCustomsComponents,
  PX_UNIT_GAP,
} from "./CartographyConstants";
import useNodeToolbar from "./useNodeToolbar";
import { useCallback, useEffect } from "react";
import MainToolbar from "./MainToolbar";
import { useTabs } from "../home/useTabs";
import { useParams, useSearchParams } from "react-router-dom";
import { useFindFileById } from "../home/useFindFileById";
import ConnectionEdgeCustom from "./ConnectionEdgeCustom";
import SheetContainer from "../sheet/SheetContainer";
import DeckContainer from "../deck/DeckContainer";
import ViewportSyncWithDb from "./ViewportSyncWithDb";
import PasteImage from "./PasteImage";
import NodeControlSidebar from "./NodeControlSidebar";

const ViewportContainer = styled.div`
  flex-grow: 1;
  background-color: var(--color-gray-100);
  position: relative;
  .react-flow__node {
    z-index: -1 !important;
  }
`;

function Viewport(): JSX.Element {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    panOnDragMode,
    mainToolbarActiveMenu,
    setPanOnDragMode,
    setSelectionMode,
    initCartography,
    setEdgeCreationProps,
    handleDuplicateNode,
    handleDragStop: clearHelpers,
    addHelperLines,
    handleDeleteSelected,
    handleNodeDrag
  } = useCartography();
  const { zoom } = useViewport();
  const { clearPositionToolbar } = useNodeToolbar();
  const { fileId } = useParams();
  const { fileDetail } = useFindFileById(fileId as string);
  const { getCartographyMode } = useTabs();
  const mode = getCartographyMode(fileId as string);
  const [searchParams] = useSearchParams();

  const deckOpen = searchParams.get("deckOpen");
  const sheetId = searchParams.get("sheetId");

  const handleNodeChange = useCallback(
    (change: NodeChange[]) => {
      if (mode === "EDIT") {
        onNodesChange(change);
      }
    },
    [onNodesChange, mode]
  );

  useEffect(() => {
    if (fileDetail?.file) {
      initCartography(fileDetail.file);
    }
  }, [fileDetail, initCartography]);

  //Clear node toolbar when no nodes are selected
  useEffect(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length === 0 || selectedNodes.length > 1) {
      clearPositionToolbar();
    }
  }, [nodes, clearPositionToolbar]);

  /*
  Change when mainToolbarActiveMenu change
  1 - Manage panOnDragMode (scroll, zoom, etc...) by regarding MainToolbar menu selected,
  2 - Reset handles for creating edges
  */
  useEffect(() => {
    if (mainToolbarActiveMenu === "SELECT") {
      setPanOnDragMode([1, 2]);
    } else if (mainToolbarActiveMenu === "CREATION-NODE") {
      setPanOnDragMode([2]);
    } else {
      setPanOnDragMode(undefined);
    }

    setEdgeCreationProps(InitialEdgeCreationState);
  }, [
    mainToolbarActiveMenu,
    setPanOnDragMode,
    setEdgeCreationProps,
  ]);

  //Manage change between default & edit mode
  useEffect(() => {
    if (mode === "DEFAULT") {
      setSelectionMode(false);
    } else {
      setSelectionMode(true);
    }
  }, [mode, setSelectionMode]);

  const handleEventDuplicateNode = useCallback(
    (e: KeyboardEvent) => {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed && (e.key === "d" || e.key === "D")) {
        handleDuplicateNode();
      }

      if(e.key === "Delete"){
        handleDeleteSelected();
      }

    },
    [handleDuplicateNode, handleDeleteSelected]
  );

  useEffect(() => {
    if (!deckOpen && !sheetId) {
      document.addEventListener("keydown", handleEventDuplicateNode);
    } else {
      document.removeEventListener("keydown", handleEventDuplicateNode);
    }

    return () => {
      document.removeEventListener("keydown", handleEventDuplicateNode);
    };
  }, [handleEventDuplicateNode, deckOpen, sheetId]);

  return (
    <ViewportContainer>
      <PasteImage />
      <ViewportSyncWithDb />
      {mode === "EDIT" && (
        <>
          <MainToolbar />
        </>
      )}
      <SheetContainer />
      <NodeControlSidebar/>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        id="viewport-container-reactflow"
        key={`viewport-${fileId}`}
        onNodesChange={handleNodeChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStart={(_e, node) => addHelperLines(node.id)}
        onNodeDragStop={clearHelpers}
        onNodeDrag={(_e, node) => handleNodeDrag(node)}
        nodeTypes={NodeCustomsComponents}
        edgeTypes={EDGE_TYPE_COMPONENT as EdgeTypes}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        connectionLineComponent={ConnectionEdgeCustom}
        snapToGrid={true}
        snapGrid={[8, 8]}
        panOnScroll
        nodeDragThreshold={24}
        selectionOnDrag={!mainToolbarActiveMenu?.startsWith("CREATION")}
        panOnDrag={panOnDragMode}
        selectionMode={SelectionMode.Full}
        minZoom={0.2}
        style={{ userSelect: "auto" }}
        maxZoom={2.5}
        fitView
        fitViewOptions={{minZoom: 1, maxZoom: 1, nodes}}
      >
        <>
          {zoom < 1.5 && (
            <Background
              variant={"dots" as BackgroundVariant}
              color={"#D6D3D1"}
              gap={PX_UNIT_GAP * 4}
              size={3}
              id="back"
            />
          )}
          {zoom > 1.5 && (
            <Background
              variant={"dots" as BackgroundVariant}
              color={"#D6D3D1"}
              gap={PX_UNIT_GAP}
              size={1}
              id="top"
            />
          )}
          <MiniMap />
        </>
      </ReactFlow>
      <DeckContainer />
    </ViewportContainer>
  );
}

export default Viewport;
