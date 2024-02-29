import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $createImageNode, INSERT_IMAGE_COMMAND, ImageNode, ImageProps } from "./ImageNode";
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from "lexical";

function PluginImage() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    editor.registerCommand<ImageProps>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
            const imageNode = $createImageNode(payload)
            $insertNodes([imageNode])
            return true;
        },
        COMMAND_PRIORITY_EDITOR
    )

  }, [editor]);

  return null;
}

export default PluginImage;
