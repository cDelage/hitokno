import { LexicalComposer } from "@lexical/react/LexicalComposer";
import {
  SheetTheme,
  initialNodeConfig,
} from "../cartography/CartographyConstants";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import styled from "styled-components";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

const ContentEditableStyled = styled(ContentEditable)`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px 16px;
  box-sizing: border-box;
  margin: 0px;
  background-color: var(--color-gray-50);

  &:focus {
    outline: none;
  }

  h3,
  h4,
  h5,
  h6,
  p {
    box-sizing: border-box;
    padding: 8px 8px;
    margin: 0px;
  }

  h1,
  h2 {
    box-sizing: border-box;
    padding: 20px 8px 8px 8px;
    margin: 0px;
  }

  ul,
  ol {
    padding: 8px 4px;
    margin: 0px 20px;
  }

  h1 {
    font-size: 44px;
    line-height: 52px;
    font-weight: 600;
    user-select: none;
  }

  h2 {
    font-size: 36px;
    line-height: 40px;
    font-weight: 400;
    user-select: none;
  }

  h3 {
    font-size: 28px;
    line-height: 28px;
    font-weight: 500;
    user-select: none;
  }

  h4 {
    font-size: 24px;
    line-height: 24px;
    font-weight: 400;
    user-select: none;
  }

  h5 {
    font-size: 20px;
    line-height: 20px;
    font-weight: 400;
    user-select: none;
  }

  h6 {
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    user-select: none;
  }

  p,
  ul,
  ol {
    font-size: 22px;
    line-height: 36px;
    font-weight: 400;
    user-select: none;
  }

  ul {
    list-style: disc;
  }

  .sheet-underline {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .sheet-italic {
    font-style: italic;
  }

  ::selection {
    color: inherit;
  }

  .sheet-code {
    display: block;
    background-color: var(--color-gray-100);
    color: var(--color-gray-800);
    border-radius: 4px;
    padding: 8px 20px;
    margin: 16px;
    border: var(--color-gray-300) 2px solid;
    box-sizing: border-box;
    box-shadow: var(--shadow-md);
  }
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 180px;
  left: 16px;
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
      <RichTextPlugin
        contentEditable={<ContentEditableStyled id="body-editable" />}
        placeholder={<PlaceHolder>Type some text...</PlaceHolder>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </LexicalComposer>
  );
}

export default SheetText;
