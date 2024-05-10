import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditToggle from "../../ui/EditToggle";
import { useFindFileById } from "../home/useFindFileById";
import { useTabs } from "../home/useTabs";
import useCartography from "./useCartography";
import useDeckStore from "../deck/useDeckStore";
import {
  IoAdd,
  IoCheckmarkCircle,
  IoSave,
  IoSettingsOutline,
} from "react-icons/io5";
import { ButtonMenu } from "../../ui/ButtonMenu";
import Menu from "../../ui/Menu";
import { useCallback, useEffect, useState } from "react";
import { SaveMode } from "../../types/Save.type";
import { useSaveFile } from "./useSaveFile";
import { CSSTransition } from "react-transition-group";
import Row, { Column } from "../../ui/Row";
import { HeaderCenter, HeaderLeft, HeaderRight } from "../../ui/UiConstants";
import ButtonHeaderToggleMenu from "../../ui/ButtonHeaderToggleMenu";
import { BiDetail, BiGrid } from "react-icons/bi";

const CartographyHeaderStyled = styled.div`
  display: flex;
  background-color: var(--bg-white);
  align-items: center;
  height: 36px;
  min-height: 36px;
  padding: 0px 8px;
  box-shadow: var(--shadow-md);
  z-index: 120;
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

const InlineDiv = styled.div`
  width: 120px;
`;

const SheetIconContainer = styled.div`
  padding: 0px 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: var(--color-gray-800);
  opacity: 0.8;
  color: white;
`

function CartographyHeader() {
  const { fileId } = useParams();
  const { toggleCartographyMode, toggleTabGrid, getTabById, toggleShowSheet } = useTabs();
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
  const tab = getTabById(fileId);
  const { mode, showGrid, showSheetLink } = tab;
  return (
    <CartographyHeaderStyled>
      <Row $style={HeaderLeft}>
        <ToggleContainer>
          <EditToggle
            isChecked={mode === "EDIT"}
            handleChange={() => toggleCartographyMode(fileId)}
          />
        </ToggleContainer>
        Edit
      </Row>
      <Row $style={HeaderCenter}>
        {folderName} / {fileName}
        {cartographySync && deckSync ? (
          <IoCheckmarkCircle color="var(--color-positive-600)" size={16} />
        ) : (
          "*"
        )}
      </Row>
      <Row $style={HeaderRight}>
        <ButtonHeaderToggleMenu
          showRight={true}
          tabs={
            <Column>
              <Row
                $gap={4}
                $style={{
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "4px",
                }}
                $hover={{
                  backgroundColor: "var(--bg-element-hover)",
                }}
                onClick={() => toggleTabGrid(fileId)}
              >
                <input type="checkbox" checked={showGrid}></input>
                <BiGrid size={20} />
                <InlineDiv>Show grid</InlineDiv>
              </Row>
              <Row
                $gap={4}
                $style={{
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "4px",
                }}
                $hover={{
                  backgroundColor: "var(--bg-element-hover)",
                }}
                onClick={() => toggleShowSheet(fileId)}
              >
                <input type="checkbox" checked={showSheetLink}></input>
                <SheetIconContainer>
                <BiDetail size="12" />
                </SheetIconContainer>
                <InlineDiv>Show sheet link</InlineDiv>
              </Row>
            </Column>
          }
        >
          <IoSettingsOutline />
        </ButtonHeaderToggleMenu>
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
      </Row>
    </CartographyHeaderStyled>
  );
}

export default CartographyHeader;
