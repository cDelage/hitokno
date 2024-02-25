import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import useCartography from "../cartography/useCartography";
import { DataNode, Sheet } from "../../types/Cartography.type";

function PluginUpdateSheet({ nodeId, data }: { nodeId: string, data : DataNode }) {
  const [editor] = useLexicalComposerContext();
  const { setNodeData } = useCartography();

  useEffect(() => {
    const removeRegister = editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return null;
        setNodeData(nodeId, {
          ...data,
          sheet: {
            ...data.sheet as Sheet,
            body: JSON.stringify(editorState),
          },
        });
      }
    );

    return () => {
      removeRegister();
    };
  }, [editor, nodeId, setNodeData, data]);

  return null;
}

export default PluginUpdateSheet;
