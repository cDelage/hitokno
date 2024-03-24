import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useCartography from "../cartography/useCartography";
import { memo, useEffect } from "react";

const PluginUpdateNodeText = memo(function PluginUpdateNodeText({
  id,
}: {
  id: string;
}) {
  const [editor] = useLexicalComposerContext();
  const { getNodeData, setNodeData } = useCartography();

  useEffect(() => {
    const removeRegister = editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return null;
        const data = getNodeData(id);
        setNodeData(id, {
          ...data,
          editorState: JSON.stringify(editorState),
        });
      }
    );

    return () => {
      removeRegister();
    };
  }, [editor, getNodeData, id, setNodeData]);

  return null;
});

export default PluginUpdateNodeText;
