import styled, { css } from "styled-components";
import { FileShort } from "../../types/Repository.types";
import HitoknoFile from "../../ui/icons/HitoknoFile";
import { useNavigate, useParams } from "react-router-dom";
import { MouseEvent } from "react";
import { useTabs } from "./useTabs";
import { useRepositoryContext } from "./useRepositoryContext";

type FileExplorerProps = {
  file: FileShort;
};

type FileExplorerStyledProps = {
  onClick: (e: MouseEvent) => void;
  $active?: boolean;
  $dragged: boolean;
};

const FileExplorerStyled = styled.div<FileExplorerStyledProps>`
  width: 100%;
  max-width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: var(--bg-element);
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  &:hover {
    ${(props) =>
      !props.$dragged &&
      css`
        background-color: var(--bg-element-hover);
      `}
  }

  ${(props) =>
    props.$active &&
    css`
      outline: solid 3px var(--outline-active);
    `}

  ${(props) =>
    props.$dragged &&
    css`
      background-color: var(--color-primary-100);
    `}
`;

const IconContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: center;
`;

const BottomContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function FileExplorer({
  file: { fileName, _id },
}: FileExplorerProps): JSX.Element {
  const navigate = useNavigate();
  const { fileId } = useParams();
  const { openTab } = useTabs();

  const { dragStart, draggedFileId, dragEnd } = useRepositoryContext();

  const active = fileId === _id;

  function handleClick() {
    navigate(`/explorer/file/${_id}`);
  }

  function handleDoubleClick() {
    openTab(_id, "EDIT", "FILE");
    navigate(`/cartography/${_id}`);
  }

  return (
    <FileExplorerStyled
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      $active={active}
      draggable
      onDragStart={() => dragStart(_id)}
      $dragged={draggedFileId === _id}
      onDragEnd={dragEnd}
    >
      <IconContainer>
        <HitoknoFile />
      </IconContainer>
      <BottomContainer>{fileName}</BottomContainer>
    </FileExplorerStyled>
  );
}

export default FileExplorer;
