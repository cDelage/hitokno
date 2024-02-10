import { ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import { TextEditMode } from "../types/TextEditMode.type";

type TextEditableProps = {
  mode: TextEditMode;
  children: string;
  onEdit: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = styled.input`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: inherit;
  width: inherit;
  border: inherit;
  height: auto;
  padding: 0;
  margin: 0;
  resize: none;
  outline: none;
`;


function TextEditable({
  mode,
  children,
  onEdit,
}: TextEditableProps): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(mode === "EDIT"){
            inputRef.current?.select();
        }
    },[mode])

    return <Input onChange={onEdit} ref={inputRef} value={children} readOnly={mode === "DEFAULT"} />;

}

export default TextEditable;
