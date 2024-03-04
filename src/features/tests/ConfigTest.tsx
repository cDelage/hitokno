import styled from "styled-components";
import Row from "../../ui/Row";
import { useFindRepository } from "../home/useFindRepository";
import useTestStore from "./useTestStore";
import { FileShort } from "../../types/Repository.types";
import { ChangeEvent, useCallback, useMemo } from "react";
import ConfigDeckEntry from "./ConfigDeckEntry";
import InputText from "../../ui/InputText";
import { useQueryClient } from "@tanstack/react-query";
import { SortMode } from "../../types/Test.type";
import ConfigSortList from "./ConfigSortList";

const TestConfigStyled = styled.div`
  width: 440px;
  background-color: var(--bg-element);
  border-radius: 8px;
  height: 100%;
  box-shadow: var(--shadow-md);
  color: var(--text-main-dark);
  padding: 0px;
  box-sizing: border-box;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RepoContainer = styled.div`
  display: block;
  overflow-y: auto;
  padding: 8px;
  background-color: var(--color-gray-200);
  max-height: 30%;
`;

const TitleContainer = styled.h1`
  padding: 8px;
`;

const LabelContainer = styled.div`
  padding: 8px;
  font-weight: 500;
  color: var(--text-main-medium);
  user-select: none;
`;

const Container = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function ConfigTest() {
  const { repository, isRepositoryLoading } = useFindRepository();
  const { test, updateTest } = useTestStore();
  const queryClient = useQueryClient();

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

  if (!repository || isRepositoryLoading || !test) return null;

  const { decks, sortMode } = test;

  const selectedFiles = decks.map((deck) =>
    files.find((file) => file._id === deck.fileId)
  ) as FileShort[];

  return (
    <TestConfigStyled>
      <Column>
        <TitleContainer>Config</TitleContainer>
        <Row $flexDirection="row" $gap={0} $padding="8px 8px 8px 0px">
          <LabelContainer>Test name </LabelContainer>
          <InputText
            type="text"
            value={test.testName}
            onChange={updateTestName}
            onBlur={handleBlurInputName}
          />
        </Row>
        <LabelContainer>Select decks to include in test</LabelContainer>
        <RepoContainer>
          <Container>
            {files.map((file) => (
              <ConfigDeckEntry file={file} key={file._id} />
            ))}
          </Container>
        </RepoContainer>
        <LabelContainer>Sort decks test order</LabelContainer>
        <Row $flexDirection="column" $gap={8} $padding="4px 0px">
          <span>
            <input
              type="radio"
              checked={sortMode === "RANDOM-CARDS"}
              onChange={() => handleChangeRadioButton("RANDOM-CARDS")}
            />
            Random cards sort
          </span>
          <span>
            <input
              type="radio"
              checked={sortMode === "RANDOM-DECKS"}
              onChange={() => handleChangeRadioButton("RANDOM-DECKS")}
            />
            Random decks sort
          </span>
          <span>
            <input
              type="radio"
              checked={sortMode === "ORDERED"}
              onChange={() => handleChangeRadioButton("ORDERED")}
            />
            Sort by deck
          </span>
        </Row>
        <RepoContainer>
          <Container>
            <ConfigSortList selectedFiles={selectedFiles} />
          </Container>
        </RepoContainer>
      </Column>
    </TestConfigStyled>
  );
}

export default ConfigTest;
