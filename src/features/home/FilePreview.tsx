import styled, { css } from "styled-components";
import { IoDocumentOutline } from "react-icons/io5";
import { device } from "../../Medias";
import { useSearchParams } from "react-router-dom";

type FilePreviewProps = {
  $active: boolean;
};

const FilePreviewStyled = styled.div<FilePreviewProps>`
  box-sizing: border-box;
  height: 100%;
  padding: 16px;
  background-color: var(--bg-element);
  box-shadow: var(--shadow-md);

  ${(props) =>
    props.$active === true
      ? css`
          color: var(--text-main-dark);
        `
      : css`
          color: var(--text-disabled);
        `}

  @media ${device.lg} {
    flex: 2;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function FilePreview(): JSX.Element {
  const [searchParams] = useSearchParams();

  const selected = searchParams.get("selected");

  const active: boolean =
    selected !== null && searchParams.get("type") === "FILE";

  return (
    <FilePreviewStyled $active={active}>
      <TitleContainer>
        <IoDocumentOutline size={28} />
        <h1>File preview</h1>
      </TitleContainer>
    </FilePreviewStyled>
  );
}

export default FilePreview;
