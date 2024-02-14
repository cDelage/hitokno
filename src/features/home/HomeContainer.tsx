import styled from "styled-components";
import Explorer from "./Explorer";
import FilePreviewContainer from "./FilePreviewContainer";
import { device } from "../../Medias";

const HomeStyled = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${device.lg} {
    flex-direction: row;
  }
`;

function HomeContainer(): JSX.Element {

  return (
    <HomeStyled>
      <Explorer />
      <FilePreviewContainer />
    </HomeStyled>
  );
}

export default HomeContainer;
