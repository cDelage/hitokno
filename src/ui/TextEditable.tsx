import { ChangeEvent, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import { TextEditMode } from "../types/TextEditMode.type";
import { useInputOutsideClick } from "../hooks/useInputOutsideClick";

type TextEditableProps = {
  mode: TextEditMode;
  children: string;
  onEdit: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickOutside?: () => void;
};

type InputProps = {
  onClick: (e: MouseEvent) => void;
}

const Input = styled.input<InputProps>`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: inherit;
  border: inherit;
  flex-grow: 1;
  height: 100%;
  padding: 0;
  margin: 0;
  resize: none;
  outline: none;
  cursor: inherit;
`;

function TextEditable({
  mode,
  children,
  onEdit,
  onClickOutside,
}: TextEditableProps): JSX.Element {
  const ref = useInputOutsideClick(() => {
    onClickOutside?.();
  });

  function handleClick(e: MouseEvent) {
    if (mode === "EDIT") {
      e.stopPropagation();
    }
  }

  useEffect(() => {
    if (mode === "EDIT") {
      ref.current?.select();
    }
  }, [mode, ref]);

  return (
      <Input
        onChange={onEdit}
        ref={ref}
        value={children}
        readOnly={mode === "DEFAULT"}
        onClick={handleClick}
      />
  );
}

export default TextEditable;
