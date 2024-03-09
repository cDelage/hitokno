import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import styled from "styled-components";

export const ContentEditableStyled = styled(ContentEditable)`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px 16px;
  box-sizing: border-box;
  margin: 0px;
  user-select: all;
  color: var(--color-gray-900);

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
  }

  h2 {
    font-size: 36px;
    line-height: 40px;
    font-weight: 400;
  }

  h3 {
    font-size: 28px;
    line-height: 28px;
    font-weight: 500;
  }

  h4 {
    font-size: 24px;
    line-height: 24px;
    font-weight: 400;
  }

  h5 {
    font-size: 20px;
    line-height: 20px;
    font-weight: 400;
  }

  h6 {
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
  }

  p,
  ul,
  ol {
    font-size: 18px;
    line-height: 36px;
    font-weight: 400;
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
    background-color: var(--color-gray-950);
    color: var(--color-gray-50);
    border-radius: 12px;
    padding: 8px 20px;
    margin: 16px;
    border: var(--color-gray-300) 2px solid;
    box-sizing: border-box;
    box-shadow: var(--shadow-md);
  }

  .PlaygroundEditorTheme__table {
    border-collapse: collapse;
    border-spacing: 0;
    max-width: 100%;
    overflow-y: scroll;
    table-layout: fixed;
    width: 100%;
    margin: 20px 0;
  }
  .PlaygroundEditorTheme__tableSelected {
    outline: 2px solid rgb(60, 132, 244);
  }
  .PlaygroundEditorTheme__tableCell {
    border: 1px solid #bbb;
    min-width: 75px;
    vertical-align: top;
    text-align: start;
    padding: 6px 8px;
    position: relative;
    cursor: default;
    outline: none;
  }
  .PlaygroundEditorTheme__tableCellSortedIndicator {
    display: block;
    opacity: 0.5;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #999;
  }
  .PlaygroundEditorTheme__tableCellResizer {
    position: absolute;
    right: -4px;
    height: 100%;
    width: 8px;
    cursor: ew-resize;
    z-index: 10;
    top: 0;
  }
  .PlaygroundEditorTheme__tableCellHeader {
    background-color: #f2f3f5;
    text-align: start;
  }
  .PlaygroundEditorTheme__tableCellSelected {
    background-color: #c9dbf0;
  }
  .PlaygroundEditorTheme__tableCellPrimarySelected {
    border: 2px solid rgb(60, 132, 244);
    display: block;
    height: calc(100% - 2px);
    position: absolute;
    width: calc(100% - 2px);
    left: -1px;
    top: -1px;
    z-index: 2;
  }
  .PlaygroundEditorTheme__tableCellEditing {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    border-radius: 3px;
  }
  .PlaygroundEditorTheme__tableAddColumns {
    position: absolute;
    top: 0;
    width: 20px;
    background-color: #eee;
    height: 100%;
    right: 0;
    animation: table-controls 0.2s ease;
    border: 0;
    cursor: pointer;
  }
  .PlaygroundEditorTheme__tableAddColumns:after {
    background-image: url(../images/icons/plus.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
  }
  .PlaygroundEditorTheme__tableAddColumns:hover {
    background-color: #c9dbf0;
  }
  .PlaygroundEditorTheme__tableAddRows {
    position: absolute;
    bottom: -25px;
    width: calc(100% - 25px);
    background-color: #eee;
    height: 20px;
    left: 0;
    animation: table-controls 0.2s ease;
    border: 0;
    cursor: pointer;
  }
  .PlaygroundEditorTheme__tableAddRows:after {
    background-image: url(../images/icons/plus.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
  }
  .PlaygroundEditorTheme__tableAddRows:hover {
    background-color: #c9dbf0;
  }
  @keyframes table-controls {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .PlaygroundEditorTheme__tableCellResizeRuler {
    display: block;
    position: absolute;
    width: 1px;
    background-color: rgb(60, 132, 244);
    height: 100%;
    top: 0;
  }
  .PlaygroundEditorTheme__tableCellActionButtonContainer {
    display: block;
    right: 5px;
    top: 6px;
    position: absolute;
    z-index: 4;
    width: 20px;
    height: 20px;
  }
  .PlaygroundEditorTheme__tableCellActionButton {
    background-color: #eee;
    display: block;
    border: 0;
    border-radius: 20px;
    width: 20px;
    height: 20px;
    color: #222;
    cursor: pointer;
  }
  .PlaygroundEditorTheme__tableCellActionButton:hover {
    background-color: #ddd;
  }

  .TableCellResizer__resizer {
    position: absolute;
  }

  .TableNode__contentEditable {
    min-height: 20px;
    border: 0px;
    resize: none;
    cursor: text;
    display: block;
    position: relative;
    tab-size: 1;
    outline: 0px;
    padding: 0;
    user-select: text;
    font-size: 15px;
    white-space: pre-wrap;
    word-break: break-word;
    z-index: 3;
  }

  .PlaygroundEditorTheme__tokenComment {
    color: slategray;
  }
  .PlaygroundEditorTheme__tokenPunctuation {
    color: #999;
  }
  .PlaygroundEditorTheme__tokenProperty {
    color: #905;
  }
  .PlaygroundEditorTheme__tokenSelector {
    color: #690;
  }
  .PlaygroundEditorTheme__tokenOperator {
    color: #9a6e3a;
  }
  .PlaygroundEditorTheme__tokenAttr {
    color: #07a;
  }
  .PlaygroundEditorTheme__tokenVariable {
    color: #e90;
  }
  .PlaygroundEditorTheme__tokenFunction {
    color: #dd4a68;
  }

  .PlaygroundEditorTheme__code {
    background-color: rgb(240, 242, 245);
    font-family: Menlo, Consolas, Monaco, monospace;
    display: block;
    padding: 8px 8px 8px 52px;
    line-height: 1.53;
    font-size: 13px;
    margin: 0;
    margin-top: 8px;
    margin-bottom: 8px;
    overflow-x: auto;
    position: relative;
    tab-size: 2;
  }
  .PlaygroundEditorTheme__code:before {
    content: attr(data-gutter);
    position: absolute;
    background-color: #eee;
    left: 0;
    top: 0;
    border-right: 1px solid #ccc;
    padding: 8px;
    color: #777;
    white-space: pre-wrap;
    text-align: right;
    min-width: 25px;
  }
`;
