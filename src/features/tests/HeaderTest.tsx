import styled from "styled-components";
import Row, { Column } from "../../ui/Row";
import DeckIcon from "../../ui/icons/DeckIcon";
import useTestStore from "./useTestStore";
import { useCallback, useMemo } from "react";
import { TestStatusTheme } from "../../types/Test.type";
import Tag from "../../ui/Tag";
import { testStatusTheme } from "./TestContants";
import { TagTheme } from "../../types/TagTheme.type";
import Button from "../../ui/Button";
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoSettingsOutline,
} from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const IconContainer = styled.div`
  height: 52px;
`;

const TitleTestContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-main-dark);
`;

const ResultCountStyle = { alignItems: "center", gap: "4px" };
const LeftContainerStyle = { alignItems: "center", height: "100%" };
const HeaderStyle = { alignItems: "center", justifyContent: "space-between" };
const JustifyCenter = {
  justifyContent: "center",
}
const AlignItemCenter = { alignItems: "center", gap: "20px" }

function HeaderTest() {
  const { test, getProgress, getCountCardsByResult } = useTestStore();
  const { countCards } = getProgress();
  const [, setSearchParams] = useSearchParams();
  const countCardsByResult = getCountCardsByResult();

  const theme = useMemo<TagTheme>(() => {
    if (test) {
      return (
        testStatusTheme.find(
          (theme) => theme.status === test.status
        ) as TestStatusTheme
      ).theme;
    }
    return "gray";
  }, [test]);

  const handleOpenSettings = useCallback(() => {
    setSearchParams({ settings: "true" });
  }, [setSearchParams]);

  if (!test) return null;

  return (
    <Row $style={HeaderStyle}>
      <Row $gap={16} $style={LeftContainerStyle}>
        <IconContainer>
          <DeckIcon />
        </IconContainer>
        <Column
          $gap={8}
          $style={JustifyCenter}
        >
          <TitleTestContainer>{test.testName}</TitleTestContainer>
          <Row $gap={8} $style={{ alignItems: "center" }}>
            <span>{countCards} cards</span>{" "}
            <Tag theme={theme}>{test.status}</Tag>
          </Row> 
        </Column>
      </Row>
      <Row $style={AlignItemCenter}>
        <Button type="secondary" $icon={true} onClick={handleOpenSettings}>
          <IoSettingsOutline size={20} /> Advanced settings
        </Button>
        <Column $gap={4}>
          <Row $style={ResultCountStyle}>
            <IoCheckmarkCircle size={20} color="var(--color-positive-500)" />
            Mastered : {countCardsByResult.mastered}
          </Row>
          <Row $style={ResultCountStyle}>
            <IoAlertCircle size={20} color="var(--color-secondary-500)" />
            Hesitated : {countCardsByResult.hesitated}
          </Row>
          <Row $style={ResultCountStyle}>
            <IoAlertCircle size={20} color="var(--color-negative-500)" />
            Failed : {countCardsByResult.failed}
          </Row>
        </Column>
      </Row>
    </Row>
  );
}

export default HeaderTest;
