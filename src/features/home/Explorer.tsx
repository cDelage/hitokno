import styled from "styled-components";
import { IoFolderOpenOutline } from "react-icons/io5";
import { device } from "../../Medias";
import CreationButton from "../../ui/CreationButton";
import { IoAdd } from "react-icons/io5";
import { useCreateFolder } from "./useCreateFolder";
import Spinner from "../../ui/Spinner";
import FolderExplorer from "./FolderExplorer";
import { useFindRepository } from "./useFindRepository";
import { createContext, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useMoveFile from "./useMoveFile";

const ExplorerStyled = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${device.lg} {
    flex: 3;
  }
`;

const ExplorerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const TitleContainer = styled.h1`
  color: var(--text-main-active);
`;

const ExplorerMain = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 16px;
  gap: 8px;
`;

type ExplorerContextType = {
  draggedFileId: string;
  draggedEnterId: string;
  dragStart: (id: string) => void;
  dragEnter: (id: string) => void;
  dragEnd: () => void;
};

export const ExplorerContext = createContext<ExplorerContextType | null>(null);

function Explorer(): JSX.Element {
  const { repository, isRepositoryLoading } = useFindRepository();
  const { isPending, createFolder } = useCreateFolder();
  const queryClient = useQueryClient();

  const { moveFile } = useMoveFile();

  const [draggedFileId, setDraggedFileId] = useState("");
  const [draggedEnterId, setDraggedEnterId] = useState("");

  const dragStart = useCallback(
    (id: string) => {
      setDraggedFileId(id);
    },
    [setDraggedFileId]
  );

  const dragEnter = useCallback(
    (id: string) => {
      setDraggedEnterId(id);
    },
    [setDraggedEnterId]
  );

  const dragEnd = useCallback(() => {
    moveFile(
      {
        fileId: draggedFileId,
        folderId: draggedEnterId,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: ["repository"],
          });
        },
      }
    );

    setDraggedFileId("");
    setDraggedEnterId("");
  }, [
    queryClient,
    setDraggedEnterId,
    setDraggedFileId,
    moveFile,
    draggedFileId,
    draggedEnterId,
  ]);

  return (
    <ExplorerContext.Provider
      value={{
        dragEnter,
        draggedEnterId,
        draggedFileId,
        dragStart,
        dragEnd,
      }}
    >
      <ExplorerStyled>
        <ExplorerHeader>
          <TitleContainer>
            <IoFolderOpenOutline size={28} />
            Explorer
          </TitleContainer>
          <CreationButton
            $isContainIcon={true}
            onClick={() => createFolder?.()}
            disabled={isPending}
          >
            <IoAdd size={20} /> New folder
          </CreationButton>
        </ExplorerHeader>
        <ExplorerMain>
          {isRepositoryLoading ? (
            <Spinner />
          ) : (
            <>
              {repository?.map((folder) => (
                <FolderExplorer key={folder._id} folder={folder} />
              ))}
            </>
          )}
        </ExplorerMain>
      </ExplorerStyled>
    </ExplorerContext.Provider>
  );
}

export default Explorer;
