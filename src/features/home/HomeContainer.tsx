import styled from "styled-components";
import Explorer from "./Explorer";
import FilePreviewContainer from "./FilePreviewContainer";
import { device } from "../../Medias";
import { ButtonHeader } from "../../ui/ButtonHeader";
import { IoTimeOutline } from "react-icons/io5";
import TestHistoryHomeModal from "./TestHistoryHomeModal";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

const HomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  position: relative;
`;

const ExplorerContainer = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;

  @media ${device.lg} {
    flex-direction: row;
  }
`;

const HeaderHome = styled.div`
  background-color: white;
  display: flex;
  height: 36px;
  min-height: 36px;
  box-shadow: var(--shadow-md);
  padding: 0px 8px;
  align-items: center;
  justify-content: space-between;
`;
const SpanLeft = styled.div`
  width: 116px;
`;

function HomeContainer(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOpenTestHistory = useCallback(() => {
    if (searchParams.get("testHistory") === null) {
      setSearchParams({
        testHistory: "true",
      });
    } else {
      searchParams.delete("testHistory");
      setSearchParams(searchParams);
    }
  }, [setSearchParams, searchParams]);

  return (
    <HomeStyled>
      <TestHistoryHomeModal />
      <HeaderHome>
        <SpanLeft />
        <span>Homepage</span>
        <span>
          <ButtonHeader onClick={handleOpenTestHistory}>
            <IoTimeOutline size={16} />
            Test history
          </ButtonHeader>
        </span>
      </HeaderHome>
      <ExplorerContainer>
        <Explorer />
        <FilePreviewContainer />
      </ExplorerContainer>
    </HomeStyled>
  );
}

export default HomeContainer;
