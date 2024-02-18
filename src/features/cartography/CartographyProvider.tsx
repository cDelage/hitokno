import { ReactFlowProvider } from "reactflow";
import { ChildrenProps } from "../../types/ChildrenProps.type";


function CartographyProvider({ children }: ChildrenProps): JSX.Element {
  return (
    <ReactFlowProvider>
        {children}
    </ReactFlowProvider>
  );
}


export default CartographyProvider;
