import { IoDocumentOutline } from "react-icons/io5";
import FilePreview from "./FilePreview";
import styled, { css } from "styled-components";
import useFindFile from "./useFindFile";
import TextEditable from "../../ui/TextEditable";
import { useSearchParams } from "react-router-dom";
import { TextEditMode } from "../../types/TextEditMode.type";
import { ChangeEvent } from "react";
import { useRenameFile } from "./useRenameFile";

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

function FileSelected(): JSX.Element {
  const { isLoadingFile, fileDetail } = useFindFile();
  const [searchParams, setSearchParams] = useSearchParams();
  const { renameFile } = useRenameFile();

  const paramsMode = searchParams.get("mode");
  const mode = paramsMode ? paramsMode : "DEFAULT";

  function switchModeEditFilename() {
    console.log("EDIT");
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

  return (
    <FileSelectedStyled>
      <FilePreview>
        <FilePreview.Title>
          <IoDocumentOutline size={28} /> File preview
        </FilePreview.Title>
        <FilePreview.Viewport
          title={
            <>
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
            </>
          }
        >
          <h1>PREVIEW {fileDetail?.file.fileName}</h1>
        </FilePreview.Viewport>
        <FilePreview.Actions disabled={isLoadingFile} />
      </FilePreview>
    </FileSelectedStyled>
  );
}

export default FileSelected;
