import styled from "styled-components";
import { IoDocumentOutline } from "react-icons/io5";
import { device } from "../../Medias";

const FilePreviewStyled = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 16px;
  background-color: var(--bg-element);
  box-shadow: var(--shadow-md);

  @media ${device.lg} {
    flex: 2;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-main-dark);
`;

function FilePreview(): JSX.Element {
  return <FilePreviewStyled>
    <TitleContainer>
        <IoDocumentOutline size={28} />
        <h1>File preview</h1>
      </TitleContainer>
  </FilePreviewStyled>;
}

export default FilePreview;
