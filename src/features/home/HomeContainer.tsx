import styled from "styled-components";
import Explorer from "./Explorer";
import FilePreviewContainer from "./FilePreviewContainer";
import { device } from "../../Medias";
import { ButtonHeader } from "../../ui/ButtonHeader";
import { IoPlayOutline, IoTimeOutline } from "react-icons/io5";
import TestHistoryHomeModal from "./TestHistoryHomeModal";
import { useParams, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import Row from "../../ui/Row";
import {
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from "../../ui/UiConstants";
import useCreateTest from "../tests/useCreateTest";

const HomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
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
`;

function HomeContainer(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const {createTest} = useCreateTest();
  const {fileId} = useParams();
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
    <HomeStyled key={fileId}>
      <TestHistoryHomeModal />
      <HeaderHome>
        <Row $style={HeaderLeft} />
        <Row $style={HeaderCenter}>Homepage</Row>
        <Row $style={HeaderRight}>
          <ButtonHeader onClick={() => createTest([])}>
            <IoPlayOutline size={16} />
            Play new test
          </ButtonHeader>
          <ButtonHeader onClick={handleOpenTestHistory}>
            <IoTimeOutline size={16} />
            Test history
          </ButtonHeader>
        </Row>
      </HeaderHome>
      <ExplorerContainer>
        <Explorer />
        <FilePreviewContainer />
      </ExplorerContainer>
    </HomeStyled>
  );
}

export default HomeContainer;
