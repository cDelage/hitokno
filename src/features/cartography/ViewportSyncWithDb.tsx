import { useEffect, useState } from "react";
import useCartography from "./useCartography";
import { useParams } from "react-router-dom";
import { useFindFileById } from "../home/useFindFileById";
import { useUpdateCartography } from "./useUpdateCartography";

function ViewportSyncWithDb() {
  const [isTimeoutActive, setIsTimeoutActive] = useState<boolean>(false);
  const {
    edges,
    mainToolbarActiveMenu,
    getNodesForSave,
    isSyncWithDB,
    setIsSyncWithDB,
  } = useCartography();
  const { fileId } = useParams();
  const { fileDetail } = useFindFileById(fileId as string);
  const { updateCartography, isUpdateCartographyPending } =
    useUpdateCartography();

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

  return null;
}

export default ViewportSyncWithDb;
