import styled from "styled-components";
import { File } from "../../types/Repository.types";
import HitoknoFile from "../../ui/icons/HitoknoFile";
import { IoEllipsisVertical } from "react-icons/io5";

type FileExplorerType = {
  file: File;
};

const FileExplorerStyled = styled.div`
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
`;

const IconContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: center;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function FileExplorer({ file: { fileName } }: FileExplorerType): JSX.Element {
  return (
    <FileExplorerStyled>
      <IconContainer>
        <HitoknoFile />
      </IconContainer>
      <BottomContainer><div>{fileName}</div> <IoEllipsisVertical size={20}/></BottomContainer>
    </FileExplorerStyled>
  );
}

export default FileExplorer;
