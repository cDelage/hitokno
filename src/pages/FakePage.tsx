import styled from "styled-components";
import Button from "../ui/Button";
import { IoAirplane } from "react-icons/io5";
import { ChangeEvent, useState } from "react";
import TextEditable from "../ui/TextEditable";

const getWidthOfText = function(text: string) {
  const element = document.createElement('div');
  element.style.display = 'inline-block';
  element.innerHTML = text;
  document.body.appendChild(element);
  const width = element.offsetWidth;
  document.body.removeChild(element);
  return width;
};

const DummyStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;

const Line = styled.div`
  display: flex;
  gap: 32px;
`;

type InputTestProps = {
  $width : number;
}

const InputTest = styled.input<InputTestProps>`
  border: 2px black solid;
  width: fit-content;
  font-size: 1rem;
  width: ${(props) => props.$width}px;
`;

const InputContainer = styled.div`
  font-size: 1rem;
`;

function FakePage() {
  const [mode, setMode] = useState<"DEFAULT" | "EDIT">("DEFAULT");
  const [text, setText] = useState<string>("Hello");
  const [inpVal, setInpVal] = useState("");

  function toggleMode() {
    setMode((mode) => {
      if (mode === "DEFAULT") return "EDIT";
      else return "DEFAULT";
    });
  }

  function EditText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <DummyStyled>
      <div>
        <Button type="primary" $icon={true}>
          <IoAirplane /> Primary
        </Button>
      </div>
      <div>
        <Button type="secondary" $icon={true}>
          <IoAirplane /> Secondary
        </Button>
      </div>
      <div>
        <Button type="danger" $icon={true}>
          <IoAirplane /> Danger
        </Button>
      </div>
      <div>
        <Button type="danger" $icon={true} disabled>
          <IoAirplane /> Disabled
        </Button>
      </div>
      <Line>
        <Button type="primary" onClick={toggleMode}>
          Toggle Mode
        </Button>
        <TextEditable mode={mode} onEdit={EditText}>
          {text}
        </TextEditable>
      </Line>
      <InputContainer>
        <InputTest
          type="text"
          value={inpVal}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInpVal(e.target.value)
          }
          $width={getWidthOfText(inpVal)}
        />
      </InputContainer>
    </DummyStyled>
  );
}

export default FakePage;
