import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import styled, { css } from "styled-components";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import { NodeTheme, initialNodeConfig } from "./CartographyConstants";
import { Theme } from "../../types/Cartography.type";
import { memo } from "react";

type ContenteEditableStyledProps = {
  color: string;
  $selectedColor: string;
  $active: boolean;
};

const ContentEditableStyled = styled(
  ContentEditable
)<ContenteEditableStyledProps>`
  flex-grow: 1;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin: 0px;
  overflow: hidden;
  color: ${(props) => props.color};
  font-size: 28px;
  line-height: 32px;
  font-weight: 400;

  &:focus {
    outline: none;
  }

  h1 {
    font-size: 52px;
    line-height: 48px;
    font-weight: 500;
    user-select: none;
  }

  h2 {
    font-size: 36px;
    line-height: 48px;
    font-weight: 400;
    user-select: none;
  }

  h3 {
    font-size: 28px;
    line-height: 36px;
    font-weight: 400;
    user-select: none;
  }

  .node-underline {
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .node-italic {
    font-style: italic;
  }

  .edit-mode {
    cursor: text;
  }

  ::selection {
    background-color: ${(props) => props.$selectedColor};
    color: ${(props) => props.color};
  }

  ${(props) =>
    props.$active
      ? css`
          cursor: text;
        `
      : css`
          user-select: none;
        `}
`;

const NodeText = memo(function NodeText({
  children,
  mode,
  theme,
  editorState,
}: ChildrenProps & { mode: string; editorState?: string; theme: Theme }) {
  return (
    <LexicalComposer
      initialConfig={{
        ...initialNodeConfig,
        editorState,
        theme: NodeTheme,
        editable: true,
      }}
    >
      <RichTextPlugin
        contentEditable={
          <ContentEditableStyled
            id="content-editable"
            className={
              mode === "EDIT" ? "nodrag htk-theme-node" : "htk-theme-node"
            }
            color={theme.color}
            $selectedColor={theme.stroke}
            $active={mode === "EDIT"}
          />
        }
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />

      {children}
    </LexicalComposer>
  );
});

export default NodeText;
