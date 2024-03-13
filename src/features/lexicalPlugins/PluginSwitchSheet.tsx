import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $setSelection, EditorState } from "lexical";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function PluginSwitchSheet({ body }: { body?: string }) {
  const [editor] = useLexicalComposerContext();
  const [searchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  const [currentSheet, setCurrentSheet] = useState("");

  useEffect(() => {
    if (sheetId && currentSheet !== sheetId && body && editor.isEditable()) {
      setCurrentSheet(sheetId);
      const newState: EditorState = editor.parseEditorState(body);
      if(!currentSheet){
        editor.update(() => {
          const selection = $getSelection();
          editor.setEditorState(newState);
          $setSelection(selection);
        });
      }else {
        editor.setEditorState(newState);
      }
    }
  }, [sheetId, setCurrentSheet, currentSheet, editor, body]);

  return null;
}

export default PluginSwitchSheet;
