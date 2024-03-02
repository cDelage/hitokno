import styled from "styled-components";
import { FileShort } from "../../types/Repository.types";
import Row from "../../ui/Row";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useMemo, useState } from "react";

const DeckEntryContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--color-gray-300);
`

const DeckEntryStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0px;
  cursor: pointer;
`;

const CardsCount = styled.div`
  color: var(--text-main-medium);
`;

function ConfigDeckEntry({ file }: { file: FileShort }) {
  const [isExpand, setIsExpand] = useState(false);

  const chevronStyle = useMemo(() => {
    return {
      transform: isExpand ? "rotate(90deg)" : "rotate(0deg)",
      transition: "transform .2s ease-out",
    };
  }, [isExpand]);

  return (
    <DeckEntryStyled
      onClick={() => {
        setIsExpand((x) => !x);
      }}
    >
      <Row $flexDirection="row" $gap={8} $alignItems="center">
        <input type="checkbox" />
        <IoChevronForwardOutline style={chevronStyle} size={16}/>
        {file.fileName}
      </Row>
      <CardsCount>{file.deck.length} Cards</CardsCount>
    </DeckEntryStyled>
  );
}

export default ConfigDeckEntry;
