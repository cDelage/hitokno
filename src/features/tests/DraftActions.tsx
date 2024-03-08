import { IoPlay, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import Button from "../../ui/Button";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import useTestStore from "./useTestStore";
import { CSSProp } from "styled-components";
import { Column } from "../../ui/Row";

const ActionStyle: CSSProp = {
  gap: "16px",
  flexGrow: 1,
  justifyContent: "center",
};

function DraftActions() {
  const [, setSearchParams] = useSearchParams();
  const { startTest } = useTestStore();
  const handleOpenSettings = useCallback(() => {
    setSearchParams({ settings: "true" });
  }, [setSearchParams]);

  return (
    <Column $style={ActionStyle}>
      <Button type="primary" $icon={true} onClick={startTest}>
        <IoPlay size={20} /> Quick start test (space)
      </Button>
      <Button type="secondary" $icon={true} onClick={handleOpenSettings}>
        <IoSettingsOutline size={20} />
        Advanced settings
      </Button>
      <Button type="secondary" $icon={true}>
        <IoTrashOutline size={20} /> Delete test draft
      </Button>
    </Column>
  );
}

export default DraftActions;
