import styled from "styled-components";
import Row from "../../ui/Row";
import { useFindRepository } from "../home/useFindRepository";
import { IoSettingsOutline } from "react-icons/io5";
import useTestStore from "./useTestStore";
import {  FileShort } from "../../types/Repository.types";
import { useMemo } from "react";
import ConfigDeckEntry from "./ConfigDeckEntry";

const TestConfigStyled = styled.div`
  width: 400px;
  background-color: var(--bg-element);
  border-radius: 8px;
  height: 100%;
  box-shadow: var(--shadow-md);
  color: var(--text-main-dark);
  padding: 16px;
  box-sizing: border-box;
`;

function TestConfig() {
  const { repository, isRepositoryLoading } = useFindRepository();
  const { test } = useTestStore();

  const decks = useMemo<FileShort[]>(() => {
    if (repository) {
      return repository.reduce((acc, cur) => {
        const files = cur.files.filter(
          (file) => file.deck.length > 0
        ) as FileShort[];
        return [...acc, ...files];
      }, [] as FileShort[]);
    }else {
      return []
    }
  }, [repository]);

  if (!repository || isRepositoryLoading || !test) return null;

  return (
    <TestConfigStyled>
      <Row $flexDirection="column" $gap={20}>
        <h1>
          <IoSettingsOutline size={24} />
          Test config
        </h1>
        <Row $flexDirection="column" $gap={8}>
          {decks.map(file => <ConfigDeckEntry file={file} key={file._id}/>)}
        </Row>
      </Row>
    </TestConfigStyled>
  );
}

export default TestConfig;
