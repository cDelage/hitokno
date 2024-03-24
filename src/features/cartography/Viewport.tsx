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
import { useCallback, useEffect, useMemo } from "react";
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

const ViewportContainer = styled.div<{
  $handleSize: number;
  $handleBorderSize: number;
}>`
  flex-grow: 1;
  background-color: var(--color-gray-100);
  position: relative;
  .react-flow__node {
    z-index: -1 !important;
  }

  .handle_edge {
    width: ${(props) => props.$handleSize}px;
    height: ${(props) => props.$handleSize}px;
    background-color: white;
    outline: ${(props) => props.$handleBorderSize}px solid #159be9;

    &:hover {
      background-color: #159be9;
      outline: ${(props) => props.$handleBorderSize}px solid white;
    }
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
    handleNodeDrag,
    setModeUpdateHandle,
    endModeUpdateHandle,
  } = useCartography();
  const { zoom } = useViewport();
  const { fileId } = useParams();
  const { fileDetail } = useFindFileById(fileId as string);
  const { getCartographyMode } = useTabs();
  const [searchParams] = useSearchParams();

  const mode = useMemo(
    () => getCartographyMode(fileId as string),
    [fileId, getCartographyMode]
  );

  const handleSize = useMemo(() => {
    return Math.round(12 / zoom);
  }, [zoom]);

  const handleBorderSize = useMemo(() => {
    return Math.round(1 / zoom);
  }, [zoom]);

  const deckOpen = useMemo(() => {
    return searchParams.get("deckOpen");
  }, [searchParams]);

  const sheetId = useMemo(() => {
    return searchParams.get("sheetId");
  }, [searchParams]);

  const handleNodeChange = useCallback(
    (change: NodeChange[]) => {
      if (mode === "EDIT") {
        onNodesChange(change);
      }
    },
    [onNodesChange, mode]
  );

  const handleEventDuplicateNode = useCallback(
    (e: KeyboardEvent) => {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed && (e.key === "d" || e.key === "D")) {
        handleDuplicateNode();
      }

      if (e.key === "Delete") {
        handleDeleteSelected();
      }
    },
    [handleDuplicateNode, handleDeleteSelected]
  );

  useEffect(() => {
    if (fileDetail?.file) {
      initCartography(fileDetail.file);
    }
  }, [fileDetail, initCartography]);

  /*
  Change when mainToolbarActiveMenu change
  1 - Manage panOnDragMode (scroll, zoom, etc...) by regarding MainToolbar menu selected,
  2 - Reset handles for creating edges
  */
  useEffect(() => {
    if (mainToolbarActiveMenu === "SELECT") {
      setPanOnDragMode([1, 2]);
    } else if (
      mainToolbarActiveMenu === "CREATION-NODE" ||
      mainToolbarActiveMenu === "CREATION-GROUP"
    ) {
      setPanOnDragMode([2]);
    } else {
      setPanOnDragMode(undefined);
    }

    setEdgeCreationProps(InitialEdgeCreationState);
  }, [mainToolbarActiveMenu, setPanOnDragMode, setEdgeCreationProps]);

  //Manage change between default & edit mode
  useEffect(() => {
    if (mode === "DEFAULT") {
      setSelectionMode(false);
    } else {
      setSelectionMode(true);
    }
  }, [mode, setSelectionMode]);

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
    <ViewportContainer
      $handleSize={handleSize}
      $handleBorderSize={handleBorderSize}
    >
      <PasteImage />
      <ViewportSyncWithDb />
      {mode === "EDIT" && (
        <>
          <MainToolbar />
        </>
      )}
      <SheetContainer />
      <NodeControlSidebar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        id="viewport-container-reactflow"
        key={`viewport-${fileId}`}
        nodeTypes={NodeCustomsComponents}
        edgeTypes={EDGE_TYPE_COMPONENT as EdgeTypes}
        onNodesChange={handleNodeChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStart={(_e, node) => addHelperLines(node.id)}
        onNodeDrag={(_e, node) => handleNodeDrag(node)}
        onNodeDragStop={clearHelpers}
        onEdgeUpdate={() => {}}
        onEdgeUpdateStart={(_e, edge, type) => {
          setModeUpdateHandle({
            edge,
            type: type === "source" ? "target" : "source",
          });
        }}
        onEdgeUpdateEnd={endModeUpdateHandle}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        connectionLineComponent={ConnectionEdgeCustom}
        snapToGrid={true}
        snapGrid={[8, 8]}
        panOnScroll
        selectionOnDrag={!mainToolbarActiveMenu?.startsWith("CREATION")}
        panOnDrag={panOnDragMode}
        selectionMode={SelectionMode.Full}
        minZoom={0.2}
        style={{ userSelect: "auto" }}
        maxZoom={2.5}
        fitView
        fitViewOptions={{ minZoom: 1, maxZoom: 1, nodes }}
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
