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
import { IoSettingsOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const IconContainer = styled.div`
  height: 52px;
`;

const TitleTestContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-main-dark);
`;

function HeaderTest() {
  const { test, getProgress } = useTestStore();
  const { countCards } = getProgress();
  const [, setSearchParams] = useSearchParams();

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
    <Row $style={{ alignItems: "center", justifyContent: "space-between" }}>
      <Row $gap={16} $style={{ alignItems: "center", height: "100%" }}>
        <IconContainer>
          <DeckIcon />
        </IconContainer>
        <Column
          $gap={8}
          $style={{
            justifyContent: "center",
          }}
        >
          <TitleTestContainer>{test.testName}</TitleTestContainer>
          <Row $gap={8} $style={{ alignItems: "center" }}>
            <span>{countCards} cards</span> <Tag theme={theme}>DRAFT</Tag>
          </Row>
        </Column>
      </Row>
      <Row $style={{ alignItems: "center", gap: "20px" }}>
        <Button type="secondary" $icon={true} onClick={handleOpenSettings}>
          <IoSettingsOutline size={20}/> Advanced settings
        </Button>
        <Column $gap={4}>
          <span>Mastered : 0</span>
          <span>Hesitated : 0</span>
          <span>Failed : 0</span>
        </Column>
      </Row>
    </Row>
  );
}

export default HeaderTest;
