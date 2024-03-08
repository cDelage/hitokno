import { TestStatus, TestType } from "../../types/Test.type";
import { THead, Table, TableContainer, Td, Th, Tr } from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useCallback } from "react";
import { testStatusTheme } from "./TestContants";
import { TagTheme } from "../../types/TagTheme.type";
import { useNavigate } from "react-router-dom";
import { useTabs } from "../home/useTabs";

function TestArray({ testArray }: { testArray: TestType[] }) {
  const navigate = useNavigate();
  const { openTab } = useTabs();

  const handleOpenTest = useCallback(
    (testId: string) => {
      openTab(testId, "DEFAULT", "TEST");
      navigate(`/test/${testId}`);
    },
    [openTab, navigate]
  );

  const getTheme = useCallback((status: TestStatus) => {
    return testStatusTheme.find((x) => x.status === status)?.theme;
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          <THead>
            <tr>
              <Th scope="col">Test name</Th>
              <Th scope="col">Decks</Th>
              <Th scope="col">Date</Th>
              <Th scope="col">Status</Th>
            </tr>
          </THead>
          <tbody>
            {testArray.length === 0 && (
              <tr>
                <Td>Tests not found</Td>
              </tr>
            )}
            {testArray.length > 0 &&
              testArray.map((test) => (
                <Tr key={test._id} onClick={() => handleOpenTest(test._id)}>
                  <Td>{test.testName}</Td>
                  <Td>
                    {test.decks.map((deck, index) => {
                      const tempIndex = index + 1;
                      if (tempIndex === test.decks.length) {
                        return deck.fileName;
                      }
                      return deck.fileName + ", ";
                    })}
                  </Td>
                  <Td>{`${test.updatedAt?.toLocaleDateString()}  ${test.updatedAt?.getHours()}:${
                    (test.updatedAt && test.updatedAt?.getMinutes() < 10)
                      ? "0"
                      : ""
                  }${test.updatedAt?.getMinutes()}`}</Td>
                  <Td>
                    <Tag theme={getTheme(test.status) as TagTheme}>
                      {test.status}
                    </Tag>
                  </Td>
                </Tr>
              ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TestArray;
