import styled from "styled-components";
import HitoknoFileEmpty from "../../ui/icons/HitoknoFileEmpty";
import { IoDocumentOutline } from "react-icons/io5";

const TopFilePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilePreviewBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ViewportContainer = styled.div`
  height: 268px;
  box-shadow: var(--shadow-md);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FileDisabled(): JSX.Element {
  return (
    <TopFilePreviewContainer>
      <TitleContainer>
        <IoDocumentOutline size={28} />
        <h1>File preview</h1>
      </TitleContainer>
      <FilePreviewBody>
        <ViewportContainer>
          <HitoknoFileEmpty />
        </ViewportContainer>
      </FilePreviewBody>
    </TopFilePreviewContainer>
  );
}

export default FileDisabled;
