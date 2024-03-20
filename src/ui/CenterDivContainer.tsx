import styled, { CSSProp } from "styled-components";
import Row from "./Row";
import { ReactNode } from "react";


const ToolbarContainerStyle: CSSProp = {
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  };

  const Relative = styled.div`
  position: relative;
  width: 0px;
`;

function CenterDivContainer({children} : {children : ReactNode}) {
  return (
    <Row $style={ToolbarContainerStyle}>
      <Relative>
        {children}
      </Relative>
    </Row>
  );
}

export default CenterDivContainer;
