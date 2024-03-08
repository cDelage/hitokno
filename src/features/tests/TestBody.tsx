import { CSSProp } from "styled-components";
import Row, { Column } from "../../ui/Row";
import FlashCardEmpty from "../deck/FlashCardEmpty";
import useTestStore from "./useTestStore";
import CurrentCard from "./CurrentCard";
import DraftActions from "./DraftActions";
import InProgressAction from "./InProgressActions";
import TestResult from "./TestResult";

const TestBodyStyle: CSSProp = {
  flexGrow: 1,
  justifyContent: "center",
  gap: "60px",
  padding: "32px",
};

const ActionsContainerStyle: CSSProp = {
  width: "600px",
  height: "100%",
  padding: "20px",
  boxSizing: "border-box",
  backgroundColor: "var(--bg-element)",
  borderRadius: "8px",
  boxShadow: "var(--shadow-md)",
};

const CardContainerStyle: CSSProp = {
  justifyContent: "center",
};

function TestBody() {
  const { test } = useTestStore();

  if (!test) return null;

  return (
    <>
      {(test.status === "DRAFT" || test.status === "IN PROGRESS") && (
        <Row $style={TestBodyStyle}>
          <Column $style={CardContainerStyle}>
            {test.status === "DRAFT" && <FlashCardEmpty />}
            {test.status === "IN PROGRESS" && <CurrentCard />}
          </Column>
          <>
            <Column $style={ActionsContainerStyle}>
              <h1>Actions</h1>
              {test.status === "DRAFT" && <DraftActions />}
              {test.status === "IN PROGRESS" && <InProgressAction />}
            </Column>
          </>
        </Row>
      )}

      {test.status === "COMPLETE" && <TestResult />}
    </>
  );
}

export default TestBody;
