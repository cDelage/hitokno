import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useLexicalEditable from "@lexical/react/useLexicalEditable";
import { NodeMode } from "../../types/Cartography.type";
import { memo, useEffect } from "react";

const PluginReadEditMode = memo(function PluginReadEditMode({ mode }: { mode: NodeMode }) {
  const [editor] = useLexicalComposerContext();
  const editable = useLexicalEditable();
  useEffect(() => {
    if (editable) {
      editor.focus();
    }else {
        editor.blur();
    }
  }, [editable, editor]);

  useEffect(() => {
    if (mode === "EDIT") {
      editor.setEditable(true);
    } else {
      editor.setEditable(false);
    }
  }, [mode, editor]);

  return null;
})

export default PluginReadEditMode;
