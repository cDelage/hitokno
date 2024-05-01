import styled, { CSSProp } from "styled-components";
import TabCollapse from "../deck/TabCollapse";
import { CSSTransition } from "react-transition-group";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { useLeitnerBox } from "./useLeitnerBox";
import { sortLeitnerBox } from "./sortLeitnerBox";
import { LeitnerBoxType } from "../../types/LeitnerBox.type";
import { IoAlbumsOutline, IoPlay } from "react-icons/io5";
import Row, { Column } from "../../ui/Row";
import Button from "../../ui/Button";
import LevelBoxesList from "./LevelBoxesList";
import LevelBoxesDetails from "./LevelBoxesDetails";

const LeitnerBoxStyled = styled.div`
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

const LeitnerBoxBody: CSSProp = {
  flexGrow: 1,
  padding: "20px",
  gap: "20px"
};


const ButtonContainer = styled.div`
  width: 250px;
`;

const BoxContainerStyle: CSSProp = {
  flexGrow: 1,
};

function LeitnerBoxContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const leitnerBoxSearchParam = searchParams.get("leitnerBox");
  const { leitnerBox } = useLeitnerBox();
  const sortedLeitnerBox: LeitnerBoxType[] = leitnerBox
    ? sortLeitnerBox(leitnerBox)
    : [];
  console.log(sortedLeitnerBox);

  const handleCloseModal = useCallback(() => {
    searchParams.delete("leitnerBox");
    setSearchParams(searchParams);
  }, [setSearchParams, searchParams]);

  return (
    <CSSTransition
      in={leitnerBoxSearchParam !== null}
      timeout={400}
      classNames="deck"
      unmountOnExit
      mountOnEnter
    >
      <LeitnerBoxStyled>
        <TabCollapse onClick={handleCloseModal} />
        <Column $style={LeitnerBoxBody}>
          <h1>
            <IoAlbumsOutline size={28} />
            Leitner box
          </h1>
          <ButtonContainer>
            <Button type="primary" $icon={true} $fullWidth={true}>
              <IoPlay /> Run cards ready to test (20)
            </Button>
          </ButtonContainer>
          <Row $gap={20} $style={BoxContainerStyle}>
            <LevelBoxesList />
            <LevelBoxesDetails />
          </Row>
        </Column>
      </LeitnerBoxStyled>
    </CSSTransition>
  );
}

export default LeitnerBoxContainer;
