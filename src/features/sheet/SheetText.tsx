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
import styled from "styled-components";

const SheetTextContainer = styled.div`
  overflow-y: auto;
  flex-grow:1;
  display: flex;

  h1, h2, h3, h4, h5, h6, p {
    padding: 4px;
  }

  h1 {
    font-size: 40px;
    line-height: 44px;
    font-weight: 700;
  }

  h2 {
    font-size: 32px;
    line-height: 40px;
    font-weight: 500;
  }

  h3 {
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
  }
`;

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
      <SheetTextContainer>
        <RichTextPlugin
          contentEditable={<ContentEditableStyled id="body-editable" />}
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </SheetTextContainer>
    </LexicalComposer>
  );
}

export default SheetText;
