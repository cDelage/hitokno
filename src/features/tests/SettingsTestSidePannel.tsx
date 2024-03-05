import styled, { CSSProp } from "styled-components";
import Row, { Column } from "../../ui/Row";
import {
  IoChevronForward,
  IoPlay,
  IoSettingsOutline,
  IoTrash,
} from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useCallback, useMemo } from "react";
import { Label } from "../../ui/Label";
import InputText from "../../ui/InputText";
import useTestStore from "./useTestStore";
import { useQueryClient } from "@tanstack/react-query";
import { useFindRepository } from "../home/useFindRepository";
import { FileShort } from "../../types/Repository.types";
import ConfigDeckEntry from "./ConfigDeckEntry";
import SortDecks from "./SortDecks";
import { SortMode } from "../../types/Test.type";
import Button from "../../ui/Button";

const ModalBackground = styled.div`
  position: absolute;
  background-color: var(--color-white);
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 700px;
  box-shadow: var(--shadow-md);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-left: 1px solid var(--color-gray-300);
  overflow: hidden;
`;

const OptionsList = styled.div`
  display: block;
  height: 248px;
  max-height: 248px;
  overflow-y: auto;
  background-color: var(--color-gray-100);
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

const Title = styled.h1`
  color: var(--text-main-dark);
`;

function SettingsTestSidePannel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { test, updateTest } = useTestStore();
  const queryClient = useQueryClient();
  const { repository } = useFindRepository();

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

  const handleCloseSetting = useCallback(() => {
    searchParams.delete("settings");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

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
            <IoChevronForward size={20} />
            <IoChevronForward size={20} />
          </Column>
          <Column $style={RightColumnStyle}>
            <Title>
              <IoSettingsOutline /> Test settings
            </Title>
            <Column $style={AllOptionsStyled}>
              <Row $style={{ alignItems: "center", gap: "16px" }}>
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
                      <ConfigDeckEntry file={file} key={file._id} />
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
                  />
                  Random cards sort
                </Row>
                <Row $gap={8}>
                  <input
                    type="radio"
                    checked={sortMode === "RANDOM-DECKS"}
                    onChange={() => handleChangeRadioButton("RANDOM-DECKS")}
                  />
                  Random decks sort
                </Row>
                {sortMode === "RANDOM-DECKS" && (
                  <Row $gap={8} $style={SubOptionStyled}>
                    <input
                      type="checkbox"
                      checked={deckOrderedRandomCardOrder}
                      onChange={handleToggleCardsShuffle}
                    />
                    Shuffled cards inside sorted decks
                  </Row>
                )}
                <Row $gap={8}>
                  <input
                    type="radio"
                    checked={sortMode === "ORDERED"}
                    onChange={() => handleChangeRadioButton("ORDERED")}
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
                      />
                      Shuffled cards inside sorted decks
                    </Row>
                    <OptionsList>
                      <OptionsContainer>
                        <SortDecks selectedFiles={selectedFiles} />
                      </OptionsContainer>
                    </OptionsList>
                  </>
                )}
              </Column>
            </Column>
            <Row $style={ButtonRowArray}>
              <Button type="secondary" $icon={true}>
                <IoTrash /> Delete test
              </Button>
              <Button type="primary" $icon={true}>
                <IoPlay /> Start test
              </Button>
            </Row>
          </Column>
        </Row>
      </ModalBackground>
    </CSSTransition>
  );
}

export default SettingsTestSidePannel;
