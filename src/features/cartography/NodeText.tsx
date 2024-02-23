import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import styled, { css } from "styled-components";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import { initialNodeConfig } from "./CartographyConstants";
import { Theme } from "../../types/Cartography.type";

const lexicalTheme = {
  text: {
    bold: "PlaygroundEditorTheme__textBold",
    italic: "PlaygroundEditorTheme__textItalic",
    underline: "htk-underline",
  },
};

type ContenteEditableStyledProps = {
  color: string;
  $selectedColor: string;
  $active: boolean;
};

const ContentEditableStyled = styled(ContentEditable)<ContenteEditableStyledProps>`
  flex-grow: 1;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin: 0px;
  overflow: hidden;
  color: ${(props) => props.color};

  &:focus {
    outline: none;
  }

  .htk-underline {
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .edit-mode {
    cursor: text;
  }

  ::selection {
    background-color: ${(props) => props.$selectedColor};
    color: ${(props) => props.color};
  }

  ${props => props.$active ? css`
    cursor: text;
  ` : css`
    user-select: none;
  `}
`;

function NodeText({
  children,
  mode,
  editorState,
  theme,
}: ChildrenProps & { mode: string; editorState?: string; theme: Theme }) {
  return (
    <LexicalComposer
      initialConfig={{ ...initialNodeConfig, theme: lexicalTheme, editorState }}
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
            $active= {mode === "EDIT"}
          />
        }
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />

      {children}
    </LexicalComposer>
  );
}

export default NodeText;
