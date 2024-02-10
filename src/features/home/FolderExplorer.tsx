import styled from "styled-components";
import { Folder } from "../../types/Repository.types";

import { MouseEvent, useState } from "react";
import NewFileButton from "./NewFileButton";
import { useCreateFile } from "./useCreateFile";
import FileExplorer from "./FileExplorer";
import { device } from "../../Medias";
import { FolderStateIcon } from "./FolderStateIcon";
import FolderMenuActions from "./FolderMenuActions";

type FolderProps = {
  folder: Folder;
};

const FolderStyled = styled.div`
  height: 36px;
  background-color: var(--bg-element);
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: var(--shadow-md);
  padding: 0px 16px;
  justify-content: space-between;
  cursor: pointer;
`;


const FolderLeftContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  user-select: none;
  cursor: auto;
`;



const FolderOpenMain = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(2, 1fr);

  @media ${device.md} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${device.xl} {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const FolderRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const FolderName = styled.div`
  color: var(--text-main-dark);
  font-weight: var(--font-weight-bold);
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

  function handleClickTab() {
    setIsFolderOpen((isOpen) => !isOpen);
  }

  function handleCreateNewFile() {
    createFile(_id);
  }

  function handleNameClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <>
      <FolderStyled onClick={handleClickTab}>
        <FolderLeftContainer>
          <FolderStateIcon isFolderOpen={isFolderOpen}/>
          <FolderName onClick={handleNameClick}>{folderName}</FolderName>
        </FolderLeftContainer>
        <FolderRightContainer>
          <DateUpdate>
            {`Last update : ${updatedAt.toLocaleDateString()} ${updatedAt.getHours()}:${updatedAt.getMinutes()}`}
          </DateUpdate>
          <FolderMenuActions _id={_id}/>
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
    </>
  );
}

export default FolderExplorer;
