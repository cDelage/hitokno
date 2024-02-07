import styled from "styled-components";
import { Folder } from "../../types/Repository.types";
import { IoChevronForwardOutline, IoFolderOutline } from "react-icons/io5";
import { IoFolderOpen } from "react-icons/io5";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MouseEvent, useState } from "react";
import NewFileButton from "./NewFileButton";
import { useCreateFile } from "./useCreateFile";
import FileExplorer from "./FileExplorer";
import { device } from "../../Medias";
import IconButton from "../../ui/IconButton";

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

const FolderIconsContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const FolderLeftContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  user-select: none;
  cursor: auto;

`;

const FolderOpenIcon = styled(IoFolderOpen)`
  color: var(--text-main-blue);
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

function FolderExplorer({ folder }: FolderProps): JSX.Element {
  const { folderName, _id, files } = folder;
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const { isPending, createFile } = useCreateFile();

  const chevronStyle = {
    transform: isFolderOpen ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform .2s ease-out",
  };

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
          <FolderIconsContainer>
            <IoChevronForwardOutline style={chevronStyle} />
            {isFolderOpen ? (
              <FolderOpenIcon size={20} />
            ) : (
              <IoFolderOutline size={20} />
            )}
          </FolderIconsContainer>
          <div onClick={handleNameClick}>{folderName}</div>
        </FolderLeftContainer>
        <IconButton>
          <IoEllipsisHorizontal size={20} />
        </IconButton>
      </FolderStyled>
      {isFolderOpen && (
        <FolderOpenMain>
          {files.map((file) => (
            <FileExplorer key={file._id} file={file} />
          ))}
          <NewFileButton onClick={handleCreateNewFile} disabled={isPending} />
        </FolderOpenMain>
      )}
    </>
  );
}

export default FolderExplorer;
