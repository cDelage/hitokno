import styled from "styled-components";
import { device } from "../../Medias";
import { Outlet } from "react-router-dom";


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

function FilePreviewContainer(): JSX.Element {

  return (
    <FilePreviewStyled>
      <Outlet/>
    </FilePreviewStyled>
  );
}

export default FilePreviewContainer;
