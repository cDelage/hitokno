import styled from "styled-components";
import Button from "../ui/Button";
import { IoAirplane } from "react-icons/io5";
import { ChangeEvent,  useState } from "react";
import { ResizableBox, ResizeCallbackData } from "react-resizable";


const DivResizable = styled.div`
.react-resizable {
  position: relative;
}
.react-resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
  background-position: bottom right;
  padding: 0 3px 3px 0;
  background-color: gray;
}
.react-resizable-handle-sw {
  bottom: 0;
  left: 0;
  cursor: sw-resize;
  transform: rotate(90deg);
}
.react-resizable-handle-se {
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
.react-resizable-handle-nw {
  top: 0;
  left: 0;
  cursor: nw-resize;
  transform: rotate(180deg);
}
.react-resizable-handle-ne {
  top: 0;
  right: 0;
  cursor: ne-resize;
  transform: rotate(270deg);
}
.react-resizable-handle-w,
.react-resizable-handle-e {
  top: 50%;
  margin-top: -10px;
  cursor: ew-resize;
}
.react-resizable-handle-w {
  left: 0;
  transform: rotate(135deg);
}
.react-resizable-handle-e {
  right: 0;
  transform: rotate(315deg);
}
.react-resizable-handle-n,
.react-resizable-handle-s {
  left: 50%;
  margin-left: -10px;
  cursor: ns-resize;
}
.react-resizable-handle-n {
  top: 0;
  transform: rotate(225deg);
}
.react-resizable-handle-s {
  bottom: 0;
  transform: rotate(45deg);
}
`

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
  gap: 32px;
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

  const [resizableState, setResizableState] = useState({
    width: 200,
    height: 200,
  });

  function resize(e: React.SyntheticEvent, {size}: ResizeCallbackData) {
      setResizableState({
        width: size.width,
        height: size.height,
      });
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
      <button>
        Toggle
      </button>

      <div></div>
      <DivResizable>
        <ResizableBox
          width={resizableState.width}
          height={resizableState.height}
          minConstraints={[100, 100]}
          maxConstraints={[300, 300]}
          onResize={resize}
        >
          <span>Contents</span>
        </ResizableBox>
      </DivResizable>
    </DummyStyled>
  );
}

export default Dummy;
