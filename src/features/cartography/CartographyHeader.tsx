import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { CartographyMode } from "../../types/Cartography.type";
import EditToggle from "../../ui/EditToggle";
import { useFindFileById } from "../home/useFindFileById";

const CartographyHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-white);
  align-items: center;
  height: 32px;
  padding: 0px 8px;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const cartographyMode: CartographyMode =
    (mode && mode === "DEFAULT") || mode === "EDIT" ? mode : "DEFAULT";

  const { fileDetail, isFileLoading } = useFindFileById(fileId as string);

  function handleChangeMode() {
    setSearchParams({
      mode: cartographyMode === "DEFAULT" ? "EDIT" : "DEFAULT",
    });
  }

  if (!fileDetail || isFileLoading)
    return <CartographyHeaderStyled></CartographyHeaderStyled>;

  const {file : {fileName}, folderName} = fileDetail

  return (
    <CartographyHeaderStyled>
      <CartographyBlock>
        <ToggleContainer>
          <EditToggle
            isChecked={cartographyMode === "EDIT"}
            handleChange={handleChangeMode}
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
