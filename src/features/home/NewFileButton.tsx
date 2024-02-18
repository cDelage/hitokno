import { IoAdd } from "react-icons/io5";
import styled from "styled-components";

const NewFileButtonStyled = styled.button`
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: transparent;
  font-size: 1rem;
  border-radius: 4px;
  border: 2px dashed var(--text-main-active);
  color : var(--text-main-active);
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: var(--bg-button-secondary-hover);
  }
`;

type NewFileButtonProps = {
  onClick : () => void,
  disabled: boolean
}

function NewFileButton({onClick, disabled} : NewFileButtonProps): JSX.Element {
  return (
    <NewFileButtonStyled onClick={onClick} disabled={disabled}>
      <div>
        <IoAdd size={64}/>
      </div>
      <div>New file</div>
    </NewFileButtonStyled>
  );
}

export default NewFileButton;
