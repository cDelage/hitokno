import { IoPlay, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import Button from "../../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import useTestStore from "./useTestStore";
import { CSSProp } from "styled-components";
import { Column } from "../../ui/Row";
import useDeleteTest from "./useDeleteTest";
import { useTabs } from "../home/useTabs";
import { useQueryClient } from "@tanstack/react-query";

const ActionStyle: CSSProp = {
  gap: "16px",
  flexGrow: 1,
  justifyContent: "center",
};

function DraftActions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { startTest, test } = useTestStore();
  const {deleteTest} = useDeleteTest();
  const {closeTab} = useTabs();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const settings = searchParams.get("settings");

  const handleOpenSettings = useCallback(() => {
    setSearchParams({ settings: "true" });
  }, [setSearchParams]);

  const handleStartTestEvent = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " " && settings === null) {
        startTest();
      }
    },
    [startTest, settings]
  );

  const handleDeleteTest = useCallback(() => {
    if(test){
      deleteTest({_id: test._id}, {
        onSuccess: () => {
          closeTab(test._id)
          navigate(`/explorer/`);
          queryClient.removeQueries({
            queryKey: ["testsCriterias"],
            exact: false
          })
        }
      })
    }
  },[deleteTest, closeTab, test, navigate, queryClient])

  useEffect(() => {
    document.addEventListener("keydown", handleStartTestEvent);

    return () => {
      document.removeEventListener("keydown", handleStartTestEvent);
    };
  }, [handleStartTestEvent]);

  return (
    <Column $style={ActionStyle}>
      <Button type="primary" $icon={true} onClick={startTest}>
        <IoPlay size={20} /> Quick start test (space)
      </Button>
      <Button type="secondary" $icon={true} onClick={handleOpenSettings}>
        <IoSettingsOutline size={20} />
        Advanced settings
      </Button>
      <Button type="secondary" $icon={true} onClick={handleDeleteTest}>
        <IoTrashOutline size={20} /> Delete test draft
      </Button>
    </Column>
  );
}

export default DraftActions;
