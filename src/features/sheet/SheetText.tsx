import { LexicalComposer } from "@lexical/react/LexicalComposer";
import {
  SheetTheme,
  initialNodeConfig,
} from "../cartography/CartographyConstants";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { ContentEditableStyled } from "./ContentEditableStyled";


function SheetText({ children }: ChildrenProps) {
  return (
    <LexicalComposer
      initialConfig={{
        ...initialNodeConfig,
        theme: SheetTheme,
        editable: true,
      }}
    >
      {children}
      <RichTextPlugin
        contentEditable={<ContentEditableStyled id="body-editable" />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </LexicalComposer>
  );
}

export default SheetText;
