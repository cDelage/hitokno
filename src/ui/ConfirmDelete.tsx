import styled from "styled-components";
import Button from "./Button";

type ConfirmDeleteProps = {
  onCloseModal?: () => void;
  deleteItem: string;
  onConfirm: () => void;
};

const ItemToDelete = styled.span`
  color: var(--text-main-dark);
  font-weight: 500;
`;

const ConfirmDeleteStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ConfirmDeleteActions = styled.div`
  display: flex;
  justify-content: end;
  gap: 4px;
`;

function ConfirmDelete({
  onCloseModal,
  deleteItem,
  onConfirm
}: ConfirmDeleteProps): JSX.Element {

  function handleDeletion(){
    onConfirm();
    onCloseModal?.();
  }

  return (
    <ConfirmDeleteStyled>
      <h1>Delete</h1>
      <div>
        Are you sure to want to delete <ItemToDelete>{deleteItem}</ItemToDelete> permanantly? <br/>This action cannot be undone
      </div>
      <ConfirmDeleteActions>
        <Button onClick={() => onCloseModal?.()} type="secondary">
          Cancel
        </Button>
        <Button onClick={handleDeletion} type="danger">
          Delete
        </Button>
      </ConfirmDeleteActions>
    </ConfirmDeleteStyled>
  );
}

export default ConfirmDelete;
