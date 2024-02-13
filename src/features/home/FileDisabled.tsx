import HitoknoFileEmpty from "../../ui/icons/HitoknoFileEmpty";
import { IoDocumentOutline } from "react-icons/io5";
import FilePreview from "./FilePreview";
import { Disabled } from "../../ui/Disabled";

function FileDisabled(): JSX.Element {
  return (
    <Disabled>
      <FilePreview>
        <FilePreview.Title>
          <IoDocumentOutline size={28} /> File preview
        </FilePreview.Title>
        <FilePreview.Viewport>
          <HitoknoFileEmpty />
        </FilePreview.Viewport>
      </FilePreview>
    </Disabled>
  );
}

export default FileDisabled;
