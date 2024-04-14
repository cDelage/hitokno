import { useCallback } from "react";
import { Column } from "./Row";
import styled, { CSSProp } from "styled-components";
import ErrorIcon from "./icons/ErrorIcon";
import { ButtonHeader } from "./ButtonHeader";
import { useNavigate } from "react-router-dom";

const ColumnStyle : CSSProp = {
  width: "100%",
  height:"100%",
  gap:"20px",
  justifyContent: "center",
  alignItems:"center"
}

const Title = styled.h1`
  color: var(--text-main-active);
`

function FallbackComponent() {
  const navigate = useNavigate();
  const goBackHome = useCallback(() => {
    navigate("/")
    window.location.reload()
  },[navigate])

  return (
    <Column $style={ColumnStyle}>
      <Title>Something wrent wrong</Title>
      <ErrorIcon/>
      <ButtonHeader onClick={goBackHome}>Go back to home</ButtonHeader>
    </Column>
  );
}

export default FallbackComponent;
