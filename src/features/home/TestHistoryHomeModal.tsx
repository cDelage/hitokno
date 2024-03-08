import styled, { CSSProp } from "styled-components";
import Row, { Column } from "../../ui/Row";
import { IoTimeOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import TestArray from "../tests/TestArray";
import { SearchCriterias } from "../../types/SearchCriteria.type";
import useFindTestsByCriterias from "../tests/useFindTestByCriterias";
import Pagination from "../../ui/Pagination";
import TabCollapse from "../deck/TabCollapse";
import InputSearchBar from "../../ui/InputSearchBar";

const TestHistorySidePanelStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  z-index: 1100;
  height: 94%;
  background-color: var(--bg-element);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-gray-300);
  display: flex;
  flex-direction: column;
`;

const RightColumnStyle: CSSProp = {
  padding: "20px",
  gap: "32px",
  flexGrow: 1,
};

const Title = styled.h1`
  color: var(--text-main-dark);
`;

function TestHistoryHomeModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const testHistory = searchParams.get("testHistory");
  const [searchCriterias, setSearchCriterias] = useState<SearchCriterias>({
    pageNumber: 0,
    pageSize: 10,
    criteria: "",
  });

  const { testsByCriteria, refetchTests } = useFindTestsByCriterias(searchCriterias);
  const countPages = useMemo(
    () =>
      testsByCriteria
        ? Math.ceil(testsByCriteria.total / searchCriterias.pageSize)
        : 0,
    [testsByCriteria, searchCriterias.pageSize]
  );

  const handleCloseModal = useCallback(() => {
    searchParams.delete("testHistory");
    setSearchParams(searchParams);
  }, [setSearchParams, searchParams]);

  const handleUpdateSearchCriteria = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchCriterias((state) => {
        return {
          ...state,
          criteria: e.target.value,
          pageNumber: 0,
        };
      });
    },
    [setSearchCriterias]
  );

  const handleChangePage = useCallback(
    (selected: number) => {
      setSearchCriterias({
        ...searchCriterias,
        pageNumber: selected,
      });
    },
    [setSearchCriterias, searchCriterias]
  );

  useEffect(() => {
    if(testHistory){
      refetchTests
    }
  }, [testHistory, refetchTests]);

  return (
    <CSSTransition
      in={testHistory !== null}
      timeout={400}
      classNames="deck"
      unmountOnExit
      mountOnEnter
    >
      <TestHistorySidePanelStyled>
        <TabCollapse onClick={handleCloseModal} />
        <Column $style={RightColumnStyle}>
          <Title>
            <IoTimeOutline size={24} />
            Test history
          </Title>
          <Row $style={{ width: "600px" }}>
              <InputSearchBar
                value={searchCriterias.criteria}
                onChange={handleUpdateSearchCriteria}
                placeholder="Search a test..."
              />
          </Row>
          {testsByCriteria && (
            <Column $gap={12}>
              <TestArray testArray={testsByCriteria.tests} />
              <Row $style={{ justifyContent: "end" }}>
                <Pagination
                  onPageChange={handleChangePage}
                  currentPage={searchCriterias.pageNumber}
                  pageCount={countPages}
                />
              </Row>
            </Column>
          )}
        </Column>
      </TestHistorySidePanelStyled>
    </CSSTransition>
  );
}

export default TestHistoryHomeModal;
