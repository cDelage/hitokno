import { useEffect, useState } from "react";
import useCartography from "./useCartography";
import { useParams } from "react-router-dom";
import { useFindFileById } from "../home/useFindFileById";
import { useUpdateCartography } from "./useUpdateCartography";
import { useQueryClient } from "@tanstack/react-query";

function ViewportSyncWithDb() {
  const [isTimeoutActive, setIsTimeoutActive] = useState<boolean>(false);
  const {
    edges,
    mainToolbarActiveMenu,
    getNodesForSave,
    isSyncWithDB,
    setIsSyncWithDB,
    isSaved,
    setIsSaved,
  } = useCartography();
  const { fileId } = useParams();
  const { fileDetail } = useFindFileById(fileId as string);
  const { updateCartography, isUpdateCartographyPending } =
    useUpdateCartography();
  const queryClient = useQueryClient();

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
      updateCartography(
        {
          ...fileDetail.file,
          nodes: nodesToSave,
          edges,
          isSaved: false,
        },
        {
          onSuccess: () => {
            if (isSaved) {
              setIsSaved(false);
            }
          },
        }
      );
      setIsSyncWithDB(true);
      setIsTimeoutActive(true);
      setTimeout(() => {
        setIsTimeoutActive(false);
      }, 1000);
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
    queryClient,
    fileId,
    isSaved,
    setIsSaved,
  ]);

  return null;
}

export default ViewportSyncWithDb;
