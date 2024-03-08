import { IoDocumentOutline } from "react-icons/io5";
import FilePreview from "./FilePreview";
import styled, { CSSProp, css } from "styled-components";
import useFindFile from "./useFindFile";
import TextEditable from "../../ui/TextEditable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TextEditMode } from "../../types/TextEditMode.type";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRenameFile } from "./useRenameFile";
import { useTabs } from "./useTabs";
import useCreateTest from "../tests/useCreateTest";
import Row from "../../ui/Row";
import FileMenuActions from "./FileMenuActions";

const FileSelectedStyled = styled.div`
  color: var(--text-main-dark);
`;

const LightText = styled.span`
  color: var(--text-main-medium);
`;

type FileNameProps = {
  mode: TextEditMode;
};

const FileName = styled.span<FileNameProps>`
  font-weight: var(--font-weight-bold);
  border-radius: 4px;
  ${(props) =>
    props.mode === "EDIT" &&
    css`
      outline: solid 3px var(--outline-active);
    `}
`;

const titleStyle : CSSProp = { justifyContent: "space-between", flexGrow: 1 }

function FileSelected(): JSX.Element | null {
  const { isLoadingFile, fileDetail } = useFindFile();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { renameFile } = useRenameFile();
  const { openTab } = useTabs();
  const [isMounted, setIsMounted] = useState(false);
  const { createTest } = useCreateTest();

  const paramsMode = searchParams.get("mode");
  const mode = paramsMode ? paramsMode : "DEFAULT";

  function switchModeEditFilename() {
    setSearchParams({
      mode: "EDIT",
    });
  }

  function switchModeDefaultFilename() {
    setSearchParams({
      mode: "DEFAULT",
    });
  }

  function handleRenameFile(e: ChangeEvent<HTMLInputElement>) {
    if (fileDetail) {
      renameFile({
        fileId: fileDetail.file._id,
        filename: e.target.value,
      });
    }
  }

  function handleDisplayFile() {
    if (fileDetail?.file._id) {
      openTab(fileDetail.file._id, "DEFAULT", "FILE");
      navigate(`/cartography/${fileDetail.file._id}`);
    }
  }

  function handleEditFile() {
    if (fileDetail?.file._id) {
      openTab(fileDetail.file._id, "EDIT", "FILE");
      navigate(`/cartography/${fileDetail.file._id}`);
    }
  }

  const handleCreateTest = useCallback(() => {
    if (fileDetail) {
      createTest([
        {
          fileId: fileDetail.file._id,
          fileName: fileDetail.file.fileName,
          level0: true,
          level1: true,
          level2: true,
        },
      ]);
    }
  }, [fileDetail, createTest]);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [setIsMounted]);

  if (!fileDetail || !isMounted) return null;

  return (
    <FileSelectedStyled>
      <FilePreview>
        <FilePreview.Title>
          <IoDocumentOutline size={28} /> File preview
        </FilePreview.Title>
        <FilePreview.Viewport
          title={
            <Row $style={titleStyle}>
              <span></span>
              <span>
                <LightText>
                  <TextEditable
                    mode="DEFAULT"
                    onEdit={() => {}}
                    resizable={true}
                    value={fileDetail?.folderName ? fileDetail?.folderName : ""}
                  ></TextEditable>
                </LightText>
                <LightText>{">"}</LightText>
                <FileName
                  onDoubleClick={switchModeEditFilename}
                  mode={mode as TextEditMode}
                >
                  <TextEditable
                    mode={mode as TextEditMode}
                    onEdit={handleRenameFile}
                    resizable={true}
                    fontWeigth="600"
                    onClickOutside={switchModeDefaultFilename}
                    value={
                      fileDetail?.file.fileName ? fileDetail.file.fileName : ""
                    }
                  />
                </FileName>
              </span>
                <FileMenuActions file={fileDetail.file} />
            </Row>
          }
        >
          <FilePreview.CartographyPreview
            nodes={fileDetail.file.nodes}
            edges={fileDetail.file.edges}
          />
        </FilePreview.Viewport>
        <FilePreview.Actions
          disabled={isLoadingFile}
          displayFile={handleDisplayFile}
          editFile={handleEditFile}
          executeATest={handleCreateTest}
          disableExecuteATest={fileDetail.file.deck.length < 1}
        >
          <Row
            $style={{
              justifyContent: "center",
              color: "var(--text-main-medium)",
            }}
          >
            Deck : {fileDetail.file.deck.length} cards
          </Row>
        </FilePreview.Actions>
      </FilePreview>
    </FileSelectedStyled>
  );
}

export default FileSelected;
