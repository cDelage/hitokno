import styled, { css } from "styled-components";
import { Folder } from "../../types/Repository.types";

import { ChangeEvent, useState } from "react";
import NewFileButton from "./NewFileButton";
import { useCreateFile } from "./useCreateFile";
import FileExplorer from "./FileExplorer";
import { FolderStateIcon } from "./FolderStateIcon";
import FolderMenuActions from "./FolderMenuActions";
import { TextEditMode } from "../../types/TextEditMode.type";
import TextEditable from "../../ui/TextEditable";
import { useRenameFolder } from "./useRenameFolder";
import { useNavigate, useParams } from "react-router-dom";
import { useRepositoryContext } from "./useRepositoryContext";
import { Column } from "../../ui/Row";

type FolderProps = {
  folder: Folder;
};

type FolderStyledProps = {
  $active: boolean;
  draggedEnter: boolean;
};

const FolderStyled = styled.div<FolderStyledProps>`
  height: 36px;
  min-height: 36px;
  background-color: var(--bg-element);
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: var(--shadow-md);
  padding: 0px 16px;
  justify-content: space-between;
  cursor: pointer;

  ${(props) =>
    props.$active &&
    css`
      outline: solid 3px var(--outline-active);
    `}

  ${(props) =>
    props.draggedEnter &&
    css`
      background-color: var(--color-primary-100);
    `}
`;

const FolderLeftContainer = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FolderOpenMain = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;

const FolderRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FolderName = styled.div`
  color: var(--text-main-dark);
  font-weight: var(--font-weight-bold);
  flex-grow: 1;
  display: flex;
  user-select: none;
`;

const DateUpdate = styled.div`
  color: var(--text-main-light);
  font-style: italic;
  user-select: none;
`;

function FolderExplorer({ folder }: FolderProps): JSX.Element {
  const { folderName, _id, files, updatedAt } = folder;
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const { isPendingCreateFile, createFile } = useCreateFile();
  const { renameFolder } = useRenameFolder();
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { dragEnter, draggedEnterId } = useRepositoryContext();

  const folderNameMode: TextEditMode = folderId === _id ? "EDIT" : "DEFAULT";

  const active: boolean = folderNameMode === "EDIT";

  function handleClickTab() {
    setIsFolderOpen((isOpen) => !isOpen);
  }

  function handleCreateNewFile() {
    createFile(_id);
  }

  function handleEditFolderName(e: ChangeEvent<HTMLInputElement>) {
    renameFolder({ folderId: _id, name: e.target.value });
  }

  function handleNameOutsideClick() {
    navigate("/explorer");
  }

  return (
    <Column $gap={8} onDragEnter={() => dragEnter(_id)}>
      <FolderStyled
        onClick={handleClickTab}
        $active={active}
        draggedEnter={draggedEnterId === _id}
      >
        <FolderLeftContainer>
          <FolderStateIcon isFolderOpen={isFolderOpen} />
          <FolderName>
            <TextEditable
              mode={folderNameMode}
              onEdit={handleEditFolderName}
              onClickOutside={handleNameOutsideClick}
              value={folderName}
            />
          </FolderName>
        </FolderLeftContainer>
        <FolderRightContainer>
          <DateUpdate>
            {`Last update : ${updatedAt.toLocaleDateString()}  ${updatedAt.getHours()}:${
              updatedAt.getMinutes() < 10 ? "0" : ""
            }${updatedAt.getMinutes()}`}
          </DateUpdate>
          <FolderMenuActions _id={_id} folderName={folderName} />
        </FolderRightContainer>
      </FolderStyled>
      {isFolderOpen && (
        <FolderOpenMain>
          {files.map((file) => (
            <FileExplorer key={file._id} file={file} />
          ))}
          <NewFileButton
            onClick={handleCreateNewFile}
            disabled={isPendingCreateFile}
          />
        </FolderOpenMain>
      )}
    </Column>
  );
}

export default FolderExplorer;
