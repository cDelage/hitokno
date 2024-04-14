import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CartographyMode } from "../../types/Cartography.type";
import { memo, useEffect } from "react";

const PluginReadEditSheetMode = memo(function PluginReadEditMode({ mode }: { mode: CartographyMode }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (mode === "EDIT") {
      editor.setEditable(true);
    } else {
      editor.setEditable(false);
    }
  }, [mode, editor]);

  return null;
})

export default PluginReadEditSheetMode;
