import styled from "styled-components";
import Explorer from "./Explorer";
import FilePreviewContainer from "./FilePreviewContainer";
import { device } from "../../Medias";

const HomeStyled = styled.div`
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
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
