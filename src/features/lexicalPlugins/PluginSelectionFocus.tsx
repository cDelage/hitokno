import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $setSelection } from "lexical";
import { useEffect } from "react";

function PluginSelectionFocus(){
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const removeEvent = editor.registerUpdateListener(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setSelection(selection)
            }
        })

        return () => {
            removeEvent();
        }
    },[editor])

    return null;
}

export default PluginSelectionFocus;