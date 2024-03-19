import { ChangeEvent, MouseEvent, useEffect } from "react";
import styled, { CSSProperties, css } from "styled-components";
import { TextEditMode } from "../types/TextEditMode.type";
import { useInputOutsideDoubleClick } from "../hooks/useInputOutsideClick";

type TextEditableProps = {
  mode: TextEditMode;
  value: string;
  onEdit: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickOutside?: () => void;
  resizable?: boolean;
  style?: CSSProperties;
  fontWeigth?: string;
  lockSelection?: boolean;
  fontSize?: string;
};

type InputProps = {
  onClick: (e: MouseEvent) => void;
  $resizable: boolean;
  $style?: CSSProperties;
  $fontWeigth?: string;
  $fontSize? : string | undefined;
};

function getTextWidth(text: string, fontWeigth?: string, fontSize?: string) {
  const element = document.createElement("div");
  element.style.display = "inline-block";
  if (fontWeigth) {
    element.style.fontWeight = fontWeigth;
  }
  if(fontSize){
    element.style.fontSize = fontSize
  }
  element.innerHTML = text+ "&nbsp;";
  document.body.appendChild(element);
  const width = element.offsetWidth;
  document.body.removeChild(element);
  return width;
}

const Input = styled.input<InputProps>`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  font-weight: inherit;
  height: 100%;
  margin: 0;
  resize: none;
  outline: none;
  overflow: hidden;

  &:read-only {
    cursor: inherit;
    user-select: none;
  }

  ${(props) =>
    props.$resizable
      ? css`
          width: ${getTextWidth(props.value as string, props.$fontWeigth, props.$fontSize)}px;
          padding: 0px 4px;
        `
      : css`
          flex-grow: 1;
        `};
`;

function TextEditable({
  mode,
  value,
  onEdit,
  onClickOutside,
  resizable,
  fontWeigth,
  lockSelection,
  fontSize
}: TextEditableProps): JSX.Element {
  const ref = useInputOutsideDoubleClick(() => {
    if (mode === "EDIT") {
      onClickOutside?.();
    }
  });

  function handleClick(e: MouseEvent) {
    if (mode === "EDIT") {
      e.stopPropagation();
    }
  }

  useEffect(() => {
    if (mode === "EDIT" && !lockSelection) {
      ref.current?.select();
    } else {
      ref.current?.blur();
    }
  }, [mode, ref, lockSelection]);

  return (
    <Input
      onChange={onEdit}
      ref={ref}
      value={value}
      readOnly={mode === "DEFAULT"}
      onClick={handleClick}
      $resizable={resizable as boolean}
      $fontWeigth={fontWeigth}
      $fontSize={fontSize}
    />
  );
}

export default TextEditable;
