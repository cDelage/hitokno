import styled, { css } from "styled-components";
import { FileShort } from "../../types/Repository.types";
import HitoknoFile from "../../ui/icons/HitoknoFile";
import { useNavigate, useParams } from "react-router-dom";
import { MouseEvent } from "react";
import { useTabs } from "./useTabs";

type FileExplorerProps = {
  file: FileShort;
};

type FileExplorerStyledProps = {
  onClick: (e: MouseEvent) => void;
  $active?: boolean;
};

const FileExplorerStyled = styled.div<FileExplorerStyledProps>`
  width: 100%;
  aspect-ratio: 4 / 3;
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
    background-color: var(--bg-element-hover);
  }

  ${(props) =>
    props.$active &&
    css`
      outline: solid 3px var(--outline-active);
    `}
`;

const IconContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: center;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
`;

function FileExplorer({
  file: { fileName, _id },
}: FileExplorerProps): JSX.Element {
  const navigate = useNavigate();
  const { fileId } = useParams();
  const { openTab } = useTabs();

  const active = fileId === _id;

  function handleClick() {
    navigate(`/explorer/file/${_id}`);
  }

  function handleDoubleClick() {
    openTab(_id,"EDIT");
    navigate(`/cartography/${_id}`);
  }

  return (
    <FileExplorerStyled
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      $active={active}
    >
      <IconContainer>
        <HitoknoFile />
      </IconContainer>
      <BottomContainer>
        <div>{fileName}</div>
      </BottomContainer>
    </FileExplorerStyled>
  );
}

export default FileExplorer;
