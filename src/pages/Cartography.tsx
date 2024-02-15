import CartographyContainer from "../features/cartography/CartographyContainer";
import CartographyProvider from "../features/cartography/CartographyProvider";

function Cartography(): JSX.Element {
  return (
    <CartographyProvider>
      <CartographyContainer />
    </CartographyProvider>
  );
}

export default Cartography;
