import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditToggle from "../../ui/EditToggle";
import { useFindFileById } from "../home/useFindFileById";
import { useTabs } from "../home/useTabs";
import useCartography from "./useCartography";
import useDeckStore from "../deck/useDeckStore";
import { IoAdd, IoCheckmarkCircle, IoSave } from "react-icons/io5";
import { ButtonMenu } from "../../ui/ButtonMenu";
import Menu from "../../ui/Menu";
import { useCallback } from "react";
import { SaveMode } from "../../types/Save.type";
import { useSaveFile } from "./useSaveFile";

const CartographyHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-white);
  align-items: center;
  height: 36px;
  min-height: 36px;
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
  const { getCartographyMode, toggleCartographyMode } = useTabs();
  const { fileDetail, isFileLoading } = useFindFileById(fileId as string);
  const { isSyncWithDB: cartographySync } = useCartography();
  const { isSyncWithDb: deckSync } = useDeckStore();
  const { saveFile, isSavingFile } = useSaveFile();

  const handleSaveFile = useCallback((saveMode: SaveMode) => {
    if(fileId){
      saveFile({
        fileId,
        saveMode
      })
    }
  }, [saveFile, fileId]);

  if (!fileDetail || isFileLoading || !fileId)
    return <CartographyHeaderStyled></CartographyHeaderStyled>;

  const {
    file: { fileName },
    folderName,
  } = fileDetail;
  const cartographyMode = getCartographyMode(fileId);

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
      <CartographyBlock>
        {folderName} / {fileName}{" "}
        {cartographySync && deckSync ? (
          <IoCheckmarkCircle color="var(--color-positive-600)" size={16} />
        ) : (
          "*"
        )}
      </CartographyBlock>
      <CartographyBlock>
        <ButtonMenu
          tabs={
            <>
              <Menu.Tab onClick={() => handleSaveFile("SAVE")} disabled={isSavingFile}>
                <IoSave />
                Save
              </Menu.Tab>
              <Menu.Tab onClick={() => handleSaveFile("SAVE-AS")} disabled={isSavingFile}>
                <IoAdd /> Save as
              </Menu.Tab>
            </>
          }
        >
          Save
        </ButtonMenu>
      </CartographyBlock>
    </CartographyHeaderStyled>
  );
}

export default CartographyHeader;
