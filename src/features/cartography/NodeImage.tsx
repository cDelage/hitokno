import { useCallback, useEffect } from "react";
import { DataNode } from "../../types/Cartography.type";
import Label from "./Label";
import Resizer from "./Resizer";
import useCartography from "./useCartography";
import useNodeToolbar from "./useNodeToolbar";

function NodeImage({
  id,
  data: { src, label },
  selected,
}: {
  data: DataNode;
  selected: boolean;
  id: string;
}) {
  const { mainToolbarActiveMenu, deleteNode } = useCartography();
  const {clearPositionToolbar} = useNodeToolbar();
  const handleDeleteNode = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Delete" && selected) {
        deleteNode(id);
      }
    },
    [deleteNode, selected, id]
  );

  useEffect(() => {
    if(selected){
      clearPositionToolbar();

    }
  },[selected, clearPositionToolbar])

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteNode);

    return () => {
      document.removeEventListener("keydown", handleDeleteNode);
    };
  }, [handleDeleteNode]);

  if (!src) return null;

  return (
    <>
      {mainToolbarActiveMenu !== "CREATION-EDGE" && (
        <Resizer selected={selected} keepAspectRatio={true}/>
      )}

      <img src={src} width={"100%"} height={"100%"}/>
      <Label label={label} />
    </>
  );
}

export default NodeImage;
