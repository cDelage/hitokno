import styled from "styled-components";
import CartographyHeader from "./CartographyHeader";
import "reactflow/dist/style.css";
import CartographyViewport from "./CartographyViewport";

const CartographyContainerStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;


function CartographyContainer(): JSX.Element {

  return (
    <CartographyContainerStyled>
      <CartographyHeader />
      <CartographyViewport/>
    </CartographyContainerStyled>
  );
}

export default CartographyContainer;
