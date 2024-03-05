import { CSSProp } from "styled-components";
import Row, { Column } from "../../ui/Row";
import FlashCardEmpty from "../deck/FlashCardEmpty";
import Button from "../../ui/Button";
import { IoPlay, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import useTestStore from "./useTestStore";

const TestBodyStyle: CSSProp = {
  flexGrow: 1,
  justifyContent: "center",
  gap: "60px",
  padding: "32px",
};

const ActionsContainerStyle: CSSProp = {
  justifyContent: "top",
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

const ActionStyle: CSSProp = {
  gap: "16px",
  flexGrow: 1,
  justifyContent: "center",
};

function TestBody() {
  const [, setSearchParams] = useSearchParams();
  const { test } = useTestStore();
  const handleOpenSettings = useCallback(() => {
    setSearchParams({ settings: "true" });
  }, [setSearchParams]);

  if (!test) return null;

  return (
    <Row $style={TestBodyStyle}>
      <Column $style={CardContainerStyle}>
        <FlashCardEmpty />
      </Column>
      <Column $style={ActionsContainerStyle}>
        <h1>Actions</h1>
        <Column $style={ActionStyle}>
          {test.status === "DRAFT" && (
            <>
              <Button type="primary" $icon={true}>
                <IoPlay size={20} /> Quick start test{" "}
              </Button>
              <Button
                type="secondary"
                $icon={true}
                onClick={handleOpenSettings}
              >
                <IoSettingsOutline size={20} />
                Advanced settings{" "}
              </Button>
              <Button type="secondary" $icon={true}>
                <IoTrashOutline size={20} /> Delete test{" "}
              </Button>
            </>
          )}
        </Column>
      </Column>
    </Row>
  );
}

export default TestBody;
