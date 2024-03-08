import { CSSProp } from "styled-components";
import { Column } from "../../ui/Row";
import TestResultLine from "./TestResultLine";
import useTestStore from "./useTestStore";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";

const StyleColumn: CSSProp = {
  width: "100%",
  gap: "16px",
  flexShrink: 1,
  boxSizing: "border-box",
  padding: "16px",
  overflowY: "scroll",
  flexGrow: 1,
};

function TestResult() {
  const { test, getCountCardsByResult } = useTestStore();

  const countCardsByResult = getCountCardsByResult();

  if (!test || test.status !== "COMPLETE") return null;

  return (
    <Column $style={StyleColumn}>
      <TestResultLine
        icon={<IoAlertCircle size={24} color="var(--color-negative-500)" />}
        result="FAILED"
        count={countCardsByResult.failed}
      />
      <TestResultLine
        icon={<IoAlertCircle size={24} color="var(--color-secondary-500)" />}
        result="HESITATED"
        count={countCardsByResult.hesitated}
      />
      <TestResultLine
        icon={<IoCheckmarkCircle size={24} color="var(--color-positive-500)" />}
        result="MASTERED"
        count={countCardsByResult.mastered}
      />
    </Column>
  );
}

export default TestResult;
