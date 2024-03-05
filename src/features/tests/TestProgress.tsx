import { ProgressBar } from "../../ui/ProgressBar";
import useTestStore from "./useTestStore";
import Row, { Column } from "../../ui/Row";

function TestProgress() {
  const { test, getProgress } = useTestStore();

  const { countCards, currentCard } = getProgress();

  const percentage = countCards !== 0 ? (currentCard / countCards) * 100 : 0;

  if (!test) return null;

  return (
    <Column $gap={8}>
      <ProgressBar max={countCards} value={currentCard} />
      <Row $style={{ justifyContent: "space-between" }}>
        <span>
          Card {currentCard}/{countCards}
        </span>
        <span>{percentage}%</span>
      </Row>
    </Column>
  );
}

export default TestProgress;
