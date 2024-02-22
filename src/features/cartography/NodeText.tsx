import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import styled from "styled-components";
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
}

const ContentEditableStyled = styled(ContentEditable)<ContenteEditableStyledProps>`
  flex-grow: 1;
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;

  color: ${(props) => props.color};

  &:focus {
    outline: none;
  }

  .htk-underline {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

function NodeText({
  children,
  mode,
  editorState,
  theme
}: ChildrenProps & { mode: string; editorState?: string, theme: Theme }) {
  return (
    <LexicalComposer
      initialConfig={{ ...initialNodeConfig, theme: lexicalTheme, editorState }}
    >
      <RichTextPlugin
        contentEditable={
          <ContentEditableStyled
            id="content-editable"
            className={mode === "EDIT" ? "nodrag" : ""}
            color={theme.color}
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
