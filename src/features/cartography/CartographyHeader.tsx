import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditToggle from "../../ui/EditToggle";
import { useFindFileById } from "../home/useFindFileById";
import { useTabs } from "../home/useTabs";

const CartographyHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-white);
  align-items: center;
  height: 40px;
  padding: 0px 8px;
  box-shadow: var(--shadow-md);
  z-index: 10;
`;

const CartographyBlock = styled.span`
  display: flex;
  height: 100%;
  gap: 4px;
  align-items: center;
`;

const ToggleContainer = styled.div`
  transform: translateY(1px);
`;

function CartographyHeader() {
  const { fileId } = useParams();
  const {getCartographyMode, toggleCartographyMode} = useTabs();
  const { fileDetail, isFileLoading } = useFindFileById(fileId as string);

  
  if (!fileDetail || isFileLoading || !fileId)
  return <CartographyHeaderStyled></CartographyHeaderStyled>;
  
  const {file : {fileName}, folderName} = fileDetail
  const cartographyMode = getCartographyMode(fileId)

  return (
    <CartographyHeaderStyled>
      <CartographyBlock>
        <ToggleContainer>
          <EditToggle
            isChecked={cartographyMode === "EDIT"}
            handleChange={() => toggleCartographyMode(fileId)}
          />
        </ToggleContainer>
        Edit
      </CartographyBlock>
      <CartographyBlock>{folderName} / {fileName}</CartographyBlock>
      <CartographyBlock></CartographyBlock>
    </CartographyHeaderStyled>
  );
}

export default CartographyHeader;