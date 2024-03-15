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
import { useCallback, useEffect, useState } from "react";
import { SaveMode } from "../../types/Save.type";
import { useSaveFile } from "./useSaveFile";
import { CSSTransition } from "react-transition-group";

const CartographyHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-white);
  align-items: center;
  height: 36px;
  min-height: 36px;
  padding: 0px 8px;
  box-shadow: var(--shadow-md);
  z-index: 120;
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

const FileToSave = styled.div`
  font-weight: 600;
`;

const FileSaved = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

function CartographyHeader() {
  const { fileId } = useParams();
  const { getCartographyMode, toggleCartographyMode } = useTabs();
  const { fileDetail, isFileLoading } = useFindFileById(fileId as string);
  const {
    isSyncWithDB: cartographySync,
    isSaved,
    setIsSaved,
  } = useCartography();
  const { isSyncWithDb: deckSync } = useDeckStore();
  const { saveFile, isSavingFile } = useSaveFile();

  const [showIsSaved, setShowIsSaved] = useState(false);

  const handleSaved = useCallback(() => {
    setShowIsSaved(true);

    setTimeout(() => {
      setShowIsSaved(false);
    }, 3000);
  }, [setShowIsSaved]);

  const handleSaveFile = useCallback(
    (saveMode: SaveMode) => {
      if (fileId) {
        saveFile(
          {
            fileId,
            saveMode,
          },
          {
            onSuccess: () => {
              setIsSaved(true);
            },
          }
        );
      }
    },
    [saveFile, fileId, setIsSaved]
  );

  const handleEventKeydown = useCallback(
    (e: KeyboardEvent) => {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed && (e.key === "S" || e.key === "s")) {
        handleSaveFile("SAVE");
        handleSaved();
      }
    },
    [handleSaveFile, handleSaved]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEventKeydown);

    return () => {
      document.removeEventListener("keydown", handleEventKeydown);
    };
  }, [handleEventKeydown]);

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
        {folderName} / {fileName}
        {cartographySync && deckSync ? (
          <IoCheckmarkCircle color="var(--color-positive-600)" size={16} />
        ) : (
          "*"
        )}
      </CartographyBlock>
      <CartographyBlock>
        <ButtonMenu
          onClick={() => handleSaveFile("SAVE")}
          tabs={
            <>
              <Menu.Tab
                onClick={() => handleSaveFile("SAVE")}
                disabled={isSavingFile}
              >
                <IoSave />
                Save
              </Menu.Tab>
              <Menu.Tab
                onClick={() => handleSaveFile("SAVE-AS")}
                disabled={isSavingFile}
              >
                <IoAdd /> Save as
              </Menu.Tab>
            </>
          }
        >
          {!isSaved && <FileToSave>Save *</FileToSave>}
          <>
            {isSaved && <FileSaved>Save</FileSaved>}
            <CSSTransition
              in={isSaved && showIsSaved}
              timeout={200}
              mountOnEnter
              unmountOnExit
              classNames="success"
            >
              <>
                {isSaved && (
                  <IoCheckmarkCircle
                    color="var(--color-positive-600)"
                    size={16}
                  />
                )}
              </>
            </CSSTransition>
          </>
        </ButtonMenu>
      </CartographyBlock>
    </CartographyHeaderStyled>
  );
}

export default CartographyHeader;
