import styled from "styled-components";
import MenuToolbar from "../../ui/MenuToolbar";
import { BiPen, BiTrash } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FlashCardProps } from "../../types/Cartography.type";
import { useCallback } from "react";
import useDeckStore from "./useDeckStore";

const ActionLineContainer = styled.div`
  width: 280px;
`;

const OptionContainer = styled.span<{ color?: string }>`
  display: flex;
  gap: 4px;
  width: 124px;
`;

function FlashcardToolbar({ card }: { card: FlashCardProps }) {
  const { deleteCard, updateCard } = useDeckStore();
  const { cardId } = card;
  const handleDeleteCard = useCallback(() => {
    deleteCard(cardId);
  }, [deleteCard, cardId]);

  const handleEditCard = useCallback(() => {
    if (card.state !== "EDIT") {
      updateCard({
        ...card,
        state: "EDIT",
      });
    } else {
      updateCard({
        ...card,
        state: "DEFAULT",
      });
    }
  }, [card, updateCard]);

  return (
    <MenuToolbar
      $position={{
        top: -16,
        left: 0,
        transform: "translateY(-100%)",
      }}
      underRelative={true}
    >
      <ActionLineContainer>
        <MenuToolbar.ActionLine>
          <MenuToolbar.Action
            $justifyCenter={true}
            onClick={handleEditCard}
            $active={card.state === "EDIT"}
          >
            <BiPen size={24} />
          </MenuToolbar.Action>
          <MenuToolbar.Action $justifyCenter={true} toggle="delete">
            <BiTrash size={24} />
          </MenuToolbar.Action>
        </MenuToolbar.ActionLine>
      </ActionLineContainer>
      <MenuToolbar.SubMenu name="delete" $displayBottom={true}>
        <MenuToolbar.ActionColumn>
          <MenuToolbar.Action toggle="delete">
            <OptionContainer>
              <IoClose size={20} /> Cancel
            </OptionContainer>
          </MenuToolbar.Action>
          <MenuToolbar.Action
            $theme="danger"
            toggle="delete"
            onClick={handleDeleteCard}
          >
            <OptionContainer>
              <BiTrash size={20} /> Delete
            </OptionContainer>
          </MenuToolbar.Action>
        </MenuToolbar.ActionColumn>
      </MenuToolbar.SubMenu>
    </MenuToolbar>
  );
}

export default FlashcardToolbar;
