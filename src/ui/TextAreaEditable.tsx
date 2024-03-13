import { ChangeEvent, MouseEvent, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { TextEditMode } from "../types/TextEditMode.type";

type TextAreaProps = {
  mode: TextEditMode;
  value: string;
  onEdit: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  selectOnEdit?: boolean;
};

const TextArea = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: inherit;
  border: inherit;
  font-weight: inherit;
  height: 100%;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  margin: 0;
  resize: none;
  outline: none;

  &:read-only {
    cursor: inherit;
  }
`;

function TextAreaEditable({
  mode,
  value,
  onEdit,
  placeholder,
  selectOnEdit,
}: TextAreaProps): JSX.Element {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (mode === "EDIT") {
        e.stopPropagation();
      }
    },
    [mode]
  );

  useEffect(() => {
    if (mode === "EDIT" && selectOnEdit) {
      textAreaRef.current?.select();
    }
    if(mode === "DEFAULT"){
      textAreaRef.current?.blur();
    }
  }, [mode, selectOnEdit]);

  return (
    <TextArea
      onChange={onEdit}
      value={value}
      placeholder={placeholder}
      readOnly={mode === "DEFAULT"}
      onClick={handleClick}
      ref={textAreaRef}
    />
  );
}

export default TextAreaEditable;
