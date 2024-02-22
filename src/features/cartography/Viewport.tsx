import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  NodeChange,
  SelectionMode,
  useOnSelectionChange,
  useViewport,
} from "reactflow";
import useCartography from "./useCartography";
import styled from "styled-components";
import { NodeCustomsComponents, PX_UNIT_GAP } from "./CartographyConstants";
import useNodeToolbar from "./useNodeToolbar";
import { useEffect, useState } from "react";
import MainToolbar from "./MainToolbar";
import { useTabs } from "../home/useTabs";
import { useParams } from "react-router-dom";
import { useFindFileById } from "../home/useFindFileById";
import { useUpdateCartography } from "./useUpdateCartography";

const ViewportContainer = styled.div`
  flex-grow: 1;
`;

function Viewport(): JSX.Element {
  const [isTimeoutActive, setIsTimeoutActive] = useState<boolean>(false);
  const {
    nodes,
    edges,
    onNodesChange,
    setShowNodeToolbar,
    panOnDragMode,
    mainToolbarActiveMenu,
    setPanOnDragMode,
    setSelectionMode,
    initCartography,
    getNodesForSave,
    isSyncWithDB,
    setIsSyncWithDB,
  } = useCartography();
  const { zoom } = useViewport();
  const { clearPositionToolbar } = useNodeToolbar();
  const { fileId } = useParams();
  const { fileDetail } = useFindFileById(fileId as string);
  const { updateCartography, isUpdateCartographyPending } =
    useUpdateCartography();

  const { getCartographyMode } = useTabs();
  const mode = getCartographyMode(fileId as string);

  function handleModeChange(change: NodeChange[]) {
    if (mode === "EDIT") {
      onNodesChange(change);
      setIsSyncWithDB(false);
    }
  }

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1) {
        setShowNodeToolbar(nodes[0].id);
      }
    },
  });

  useEffect(() => {
    if (fileDetail?.file) {
      initCartography(fileDetail.file);
    }
  }, [fileDetail, initCartography]);

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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleModeChange}
        nodeTypes={NodeCustomsComponents}
        snapToGrid={true}
        snapGrid={[8, 8]}
        panOnScroll
        selectionOnDrag={!mainToolbarActiveMenu?.startsWith("CREATION")}
        panOnDrag={panOnDragMode}
        selectionMode={SelectionMode.Full}
        minZoom={1}
        maxZoom={2.5}
      >
        <Controls/>
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
