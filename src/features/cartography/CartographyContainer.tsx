import styled from "styled-components";
import CartographyHeader from "./CartographyHeader";
import "reactflow/dist/style.css";
import Viewport from "./Viewport";
import { useParams } from "react-router-dom";

const CartographyContainerStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;


function CartographyContainer(): JSX.Element {
  const {fileId} = useParams();
  return (
    <CartographyContainerStyled key={fileId}>
      <CartographyHeader />
      <Viewport/>
    </CartographyContainerStyled>
  );
}

export default CartographyContainer;
