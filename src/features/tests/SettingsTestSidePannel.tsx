import styled, { CSSProp } from "styled-components";
import Row, { Column } from "../../ui/Row";
import {
  IoChevronForward,
  IoPlay,
  IoSettingsOutline,
  IoTrash,
} from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChangeEvent, useCallback, useMemo } from "react";
import { Label } from "../../ui/Label";
import InputText from "../../ui/InputText";
import useTestStore from "./useTestStore";
import { useQueryClient } from "@tanstack/react-query";
import { useFindRepository } from "../home/useFindRepository";
import { FileShort } from "../../types/Repository.types";
import SettingsDeckEntry from "./SettingsDeckEntry";
import SortDecks from "./SortDecks";
import { SortMode } from "../../types/Test.type";
import Button from "../../ui/Button";
import useDeleteTest from "./useDeleteTest";
import { useTabs } from "../home/useTabs";

const ModalBackground = styled.div`
  position: absolute;
  background-color: var(--color-white);
  top: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 100;
  width: 700px;
  box-shadow: var(--shadow-md);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-gray-300);
`;

const OptionsList = styled.div`
  display: block;
  height: 248px;
  max-height: 248px;
  overflow-y: auto;
  background-color: var(--color-gray-200);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 12px;
`;

const OptionsContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: var(--color-gray-300) 1px solid;
`;

const SubOptionStyled: CSSProp = {
  paddingLeft: "16px",
};

const LeftCloseModal: CSSProp = {
  height: "100%",
  backgroundColor: "var(--color-gray-100)",
  justifyContent: "space-between",
  boxSizing: "border-box",
  padding: "8px 4px",
  cursor: "pointer",
};

const LeftCloseModalHover: CSSProp = {
  backgroundColor: "var(--color-gray-200)",
};

const MainRowStyle: CSSProp = {
  height: "100%",
  width: "100%",
};

const RightColumnStyle: CSSProp = {
  padding: "20px",
  gap: "32px",
  flexGrow: 1,
};

const AllOptionsStyled: CSSProp = {
  gap: "32px",
  flexShrink: 1,
  overflowY: "auto",
};

const OptionColumnStyle: CSSProp = {
  gap: "12px",
};

const ButtonRowArray: CSSProp = {
  justifyContent: "end",
  gap: "8px",
};

const CenteredElement: CSSProp = { alignItems: "center", gap: "16px" };

const Title = styled.h1`
  color: var(--text-main-dark);
`;

function SettingsTestSidePannel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { test, updateTest, startTest } = useTestStore();
  const queryClient = useQueryClient();
  const { repository } = useFindRepository();
  const { deleteTest } = useDeleteTest();
  const { closeTab } = useTabs();
  const navigate = useNavigate();

  const disabled = useMemo(
    () => (test ? test.status !== "DRAFT" : true),
    [test]
  );

  const files = useMemo<FileShort[]>(() => {
    if (repository) {
      return repository.reduce((acc, cur) => {
        const files = cur.files.filter(
          (file) => file.deck.length > 0
        ) as FileShort[];
        return [...acc, ...files];
      }, [] as FileShort[]);
    } else {
      return [];
    }
  }, [repository]);

  const settings = searchParams.get("settings");

  const handleDeleteTest = useCallback(() => {
    if (test) {
      deleteTest(
        { _id: test._id },
        {
          onSuccess: () => {
            closeTab(test._id);
            navigate(`/explorer/`);
            queryClient.removeQueries({
              queryKey: ["testsCriterias"],
              exact: false,
            });
          },
        }
      );
    }
  }, [deleteTest, closeTab, test, navigate, queryClient]);

  
  const handleCloseSetting = useCallback(() => {
    searchParams.delete("settings");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);
  
  const handleStartTest = useCallback(() => {
    startTest();
    handleCloseSetting();
  }, [startTest, handleCloseSetting]);

  const updateTestName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (test) {
        updateTest(
          {
            ...test,
            testName: e.target.value,
          },
          true
        );
      }
    },
    [updateTest, test]
  );

  const handleBlurInputName = useCallback(() => {
    if (test) {
      queryClient.invalidateQueries({
        queryKey: ["test", test._id],
      });
    }
  }, [test, queryClient]);

  const selectedFiles = useMemo<FileShort[]>(() => {
    if (test?.decks) {
      return test.decks.map(
        (deck) => files.find((file) => file._id === deck.fileId) as FileShort
      );
    }
    return [];
  }, [test?.decks, files]);

  const handleChangeRadioButton = useCallback(
    (sortMode: SortMode) => {
      if (test) {
        updateTest({
          ...test,
          sortMode,
        });
      }
    },
    [test, updateTest]
  );

  const handleToggleCardsShuffle = useCallback(() => {
    if (test) {
      updateTest({
        ...test,
        deckOrderedRandomCardOrder: !test.deckOrderedRandomCardOrder,
      });
    }
  }, [test, updateTest]);

  if (!test) return null;

  const { sortMode, deckOrderedRandomCardOrder } = test;

  return (
    <CSSTransition
      in={settings !== null}
      timeout={400}
      classNames="sheet"
      unmountOnExit
      mountOnEnter
    >
      <ModalBackground>
        <Row $style={MainRowStyle}>
          <Column
            $style={LeftCloseModal}
            $hover={LeftCloseModalHover}
            onClick={handleCloseSetting}
          >
            <IoChevronForward />
            <IoChevronForward />
          </Column>
          <Column $style={RightColumnStyle}>
            <Title>
              <IoSettingsOutline size={24} /> Test settings
            </Title>
            <Column $style={AllOptionsStyled}>
              <Row $style={CenteredElement}>
                <Label>Title</Label>
                <InputText
                  type="text"
                  value={test.testName}
                  onChange={updateTestName}
                  onBlur={handleBlurInputName}
                />
              </Row>
              <Column $style={OptionColumnStyle}>
                <Label>Select decks to include in test</Label>
                <OptionsList>
                  <OptionsContainer>
                    {files.map((file) => (
                      <SettingsDeckEntry
                        file={file}
                        key={file._id}
                        disabled={disabled}
                      />
                    ))}
                  </OptionsContainer>
                </OptionsList>
              </Column>
              <Column $style={OptionColumnStyle}>
                <Label>Sort decks test order</Label>
                <Row $gap={8}>
                  <input
                    type="radio"
                    checked={sortMode === "RANDOM-CARDS"}
                    onChange={() => handleChangeRadioButton("RANDOM-CARDS")}
                    disabled={disabled}
                  />
                  Random cards sort
                </Row>
                <Row $gap={8}>
                  <input
                    type="radio"
                    checked={sortMode === "RANDOM-DECKS"}
                    onChange={() => handleChangeRadioButton("RANDOM-DECKS")}
                    disabled={disabled}
                  />
                  Random decks sort
                </Row>
                {sortMode === "RANDOM-DECKS" && (
                  <Row $gap={8} $style={SubOptionStyled}>
                    <input
                      type="checkbox"
                      checked={deckOrderedRandomCardOrder}
                      onChange={handleToggleCardsShuffle}
                      disabled={disabled}
                    />
                    Shuffled cards inside sorted decks
                  </Row>
                )}
                <Row $gap={8}>
                  <input
                    type="radio"
                    checked={sortMode === "ORDERED"}
                    onChange={() => handleChangeRadioButton("ORDERED")}
                    disabled={disabled}
                  />
                  Sort by deck
                </Row>
                {sortMode === "ORDERED" && (
                  <>
                    <Row $gap={8} $style={SubOptionStyled}>
                      <input
                        type="checkbox"
                        checked={deckOrderedRandomCardOrder}
                        onChange={handleToggleCardsShuffle}
                        disabled={disabled}
                      />
                      Shuffled cards inside sorted decks
                    </Row>
                    <OptionsList>
                        <SortDecks
                          selectedFiles={selectedFiles}
                          disabled={disabled}
                        />
                    </OptionsList>
                  </>
                )}
              </Column>
            </Column>
            <Row $style={ButtonRowArray}>
              <Button type="secondary" $icon={true} onClick={handleDeleteTest}>
                <IoTrash /> Delete test
              </Button>
              {!disabled && (
                <Button type="primary" $icon={true} onClick={handleStartTest}>
                  <IoPlay /> Start test
                </Button>
              )}
            </Row>
          </Column>
        </Row>
      </ModalBackground>
    </CSSTransition>
  );
}

export default SettingsTestSidePannel;
