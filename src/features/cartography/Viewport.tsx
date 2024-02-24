import ReactFlow, {
  Background,
  BackgroundVariant,
  EdgeTypes,
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
import { useEffect, useState } from "react";
import MainToolbar from "./MainToolbar";
import { useTabs } from "../home/useTabs";
import { useParams } from "react-router-dom";
import { useFindFileById } from "../home/useFindFileById";
import { useUpdateCartography } from "./useUpdateCartography";
import ConnectionEdgeCustom from "./ConnectionEdgeCustom";
import SheetContainer from "../sheet/SheetContainer";

const ViewportContainer = styled.div`
  flex-grow: 1;
  background-color: var(--color-gray-100);
  position: relative;
`;

function Viewport(): JSX.Element {
  const [isTimeoutActive, setIsTimeoutActive] = useState<boolean>(false);
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
    getNodesForSave,
    isSyncWithDB,
    setIsSyncWithDB,
    setEdgeCreationProps,
  } = useCartography();
  const { zoom } = useViewport();
  const { clearPositionToolbar } = useNodeToolbar();
  const { fileId } = useParams();
  const { fileDetail } = useFindFileById(fileId as string);
  const { updateCartography, isUpdateCartographyPending } =
    useUpdateCartography();

  const { getCartographyMode } = useTabs();
  const mode = getCartographyMode(fileId as string);

  function handleNodeChange(change: NodeChange[]) {
    if (mode === "EDIT") {
      onNodesChange(change);
      setIsSyncWithDB(false);
    }
  }

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
  }, [mainToolbarActiveMenu, setPanOnDragMode, setEdgeCreationProps]);

  //Manage change between default & edit mode
  useEffect(() => {
    if (mode === "DEFAULT") {
      setSelectionMode(false);
    } else {
      setSelectionMode(true);
    }
  }, [mode, setSelectionMode]);

  /**
   * Synchronize viewport with database
   * If nodes & edges is change
   * Add a timeout to save each 2sec
   * (for avoid lot of save operation)
   */
  useEffect(() => {
    const nodesToSave = getNodesForSave();
    if (
      !isSyncWithDB &&
      !isTimeoutActive &&
      !isUpdateCartographyPending &&
      fileDetail &&
      !mainToolbarActiveMenu?.startsWith("CREATION") &&
      (nodesToSave.length != 0 || edges.length != 0)
    ) {
      updateCartography({
        ...fileDetail.file,
        nodes: nodesToSave,
        edges,
      });
      setIsSyncWithDB(true);
      setIsTimeoutActive(true);
      setTimeout(() => {
        setIsTimeoutActive(false);
      }, 2000);
    }
  }, [
    updateCartography,
    setIsTimeoutActive,
    isSyncWithDB,
    setIsSyncWithDB,
    isTimeoutActive,
    isUpdateCartographyPending,
    fileDetail,
    edges,
    getNodesForSave,
    mainToolbarActiveMenu,
  ]);

  return (
    <ViewportContainer>
      {mode === "EDIT" && (
        <>
          <MainToolbar />
        </>
      )}
      <SheetContainer/>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodeChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NodeCustomsComponents}
        edgeTypes={EDGE_TYPE_COMPONENT as EdgeTypes}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        connectionLineComponent={ConnectionEdgeCustom}
        snapToGrid={true}
        snapGrid={[8, 8]}
        panOnScroll
        selectionOnDrag={!mainToolbarActiveMenu?.startsWith("CREATION")}
        panOnDrag={panOnDragMode}
        selectionMode={SelectionMode.Full}
        minZoom={1}
        maxZoom={2.5}
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
        </>
      </ReactFlow>
    </ViewportContainer>
  );
}

export default Viewport;
