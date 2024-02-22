import styled from "styled-components";
import Button from "../ui/Button";
import { IoAirplane } from "react-icons/io5";
import { ChangeEvent, useState } from "react";

const getWidthOfText = function (text: string) {
  const element = document.createElement("div");
  element.style.display = "inline-block";
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

type InputTestProps = {
  $width: number;
};

const InputTest = styled.input<InputTestProps>`
  border: 2px black solid;
  width: fit-content;
  font-size: 1rem;
  width: ${(props) => props.$width}px;
`;

const InputContainer = styled.div`
  font-size: 1rem;
`;


function Dummy() {
  const [inpVal, setInpVal] = useState("");

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

export default Dummy;
