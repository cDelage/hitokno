import styled from "styled-components";
import Explorer from "./Explorer";
import FilePreviewContainer from "./FilePreviewContainer";
import { device } from "../../Medias";
import { ButtonHeader } from "../../ui/ButtonHeader";
import { IoAlbumsOutline, IoPlayOutline, IoTimeOutline } from "react-icons/io5";
import TestHistoryHomeModal from "./TestHistoryHomeModal";
import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import Row from "../../ui/Row";
import {
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from "../../ui/UiConstants";
import useCreateTest from "../tests/useCreateTest";
import LeitnerBoxContainer from "../leitnerBox/LeitnerBox";

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
`;

function HomeContainer(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const {createTest} = useCreateTest();
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

  const handleOpenLeitnerBox = useCallback(() => {
    if (searchParams.get("leitnerBox") === null) {
      setSearchParams({
        leitnerBox: "true",
      });
    } else {
      searchParams.delete("leitnerBox");
      setSearchParams(searchParams);
    }
  }, [setSearchParams, searchParams]);

  const testHistoryActive = useMemo(() => {return searchParams.get("testHistory") !== null},[searchParams])
  const leitnerBoxActive = useMemo(() => {return searchParams.get("leitnerBox") !== null},[searchParams])

  return (
    <HomeStyled>
      <TestHistoryHomeModal/>
      <LeitnerBoxContainer/>
      <HeaderHome>
        <Row $style={HeaderLeft}/>
        <Row $style={HeaderCenter}>Homepage</Row>
        <Row $style={HeaderRight}>
          <ButtonHeader onClick={handleOpenLeitnerBox} $active={leitnerBoxActive}>
            <IoAlbumsOutline size={16}/>
            Leitner box
          </ButtonHeader>
          <ButtonHeader onClick={() => createTest([])}>
            <IoPlayOutline size={16} />
            Play new test
          </ButtonHeader>
          <ButtonHeader onClick={handleOpenTestHistory} $active={testHistoryActive}>
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
