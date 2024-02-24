import styled, { keyframes } from "styled-components";
import Button from "../ui/Button";
import { IoAirplane } from "react-icons/io5";
import { ChangeEvent, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

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

const HelloDiv = styled.div``;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledComponent = styled.div`
  // Styles par défaut
  opacity: 1;
  animation: ${fadeIn} 0.5s ease-in-out;

  // Ajoutez une classe 'exit' pour l'animation de sortie
  &.exit {
    animation: ${fadeOut} 0.5s ease-in-out;
  }
`;

function Dummy() {
  const [inpVal, setInpVal] = useState("");
  const [isEnter, setIsEnter] = useState(false);

  useEffect(() => {
    setIsEnter(true)
    return () => {
      setIsEnter(false)
    }
  },[])

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
      <HelloDiv>
        <button
          onClick={() => {
            setIsEnter((state) => !state);
          }}
        >
          Toggle
        </button>
        <CSSTransition in={isEnter} timeout={200} className="myclass">
          <p>Hello world</p>
        </CSSTransition>

        <div>
          <CSSTransition
            in={isEnter}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <StyledComponent>TOTO</StyledComponent>
          </CSSTransition>
        </div>
      </HelloDiv>
    </DummyStyled>
  );
}

export default Dummy;
