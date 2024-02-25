import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { initialNodeConfig } from "../cartography/CartographyConstants";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import styled from "styled-components";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

const ContentEditableStyled = styled(ContentEditable)`
  flex-grow: 1;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin: 0px;
  overflow-y: auto;

  &:focus {
    outline: none;
  }
`;

const PlaceHolder = styled.div`
    position: absolute;
    top: 180px;
    left: 16px;
`

function SheetText({children, body} : ChildrenProps & {body?: string}){
    return <LexicalComposer
    initialConfig={{
      ...initialNodeConfig,
      theme: {},
      editorState: body,
      editable: true
    }}
  >
    {children}
    <RichTextPlugin
      contentEditable={<ContentEditableStyled id="body-editable" />}
      placeholder={<PlaceHolder>Type some text...</PlaceHolder>}
      ErrorBoundary={LexicalErrorBoundary}
    />
  </LexicalComposer>
}

export default SheetText;