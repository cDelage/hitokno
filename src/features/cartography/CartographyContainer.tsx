import styled from "styled-components";
import CartographyHeader from "./CartographyHeader";
import "reactflow/dist/style.css";
import Viewport from "./Viewport";

const CartographyContainerStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;


function CartographyContainer(): JSX.Element {

  return (
    <CartographyContainerStyled>
      <CartographyHeader />
      <Viewport/>
    </CartographyContainerStyled>
  );
}

export default CartographyContainer;
