import { IoDocumentOutline } from "react-icons/io5";
import FilePreview from "./FilePreview";
import styled from "styled-components";

const FileSelectedStyled = styled.div`
  color: var(--text-main-dark);
`;

function FileSelected(): JSX.Element {
  return (
    <FileSelectedStyled>
      <FilePreview>
        <FilePreview.Title>
          <IoDocumentOutline size={28} /> File preview
        </FilePreview.Title>
        <FilePreview.Viewport>
          <div>File</div>
        </FilePreview.Viewport>
      </FilePreview>
    </FileSelectedStyled>
  );
}

export default FileSelected;
