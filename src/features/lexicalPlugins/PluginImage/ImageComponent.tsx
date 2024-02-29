import styled, { css } from "styled-components";
import { ImageNode, ImageProps } from "./ImageNode";
import { useCallback, useEffect, useState } from "react";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import { useDivClickOutside } from "../../../hooks/useDivClickOutside";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";

const ImageContainer = styled.div<{ $selection: boolean }>`
  .react-resizable {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    ${(props) =>
      props.$selection &&
      css`
        border: var(--color-primary-600) 4px solid;
        box-shadow: var(--shadow-md);
        box-sizing: content-box;
      `}
  }
  .react-resizable-handle {
    ${(props) =>
      props.$selection &&
      css`
        position: absolute;
        width: 32px;
        height: 32px;
        background-repeat: no-repeat;
        background-origin: border-box;
        box-sizing: border-box;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpb25pY29uIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMzIiIGQ9Ik0zMDQgOTZoMTEydjExMk00MDUuNzcgMTA2LjJMMTExLjk4IDQwMC4wMk0yMDggNDE2SDk2VjMwNCIvPjwvc3ZnPg==");
        background-position: bottom right;
        padding: 4px;
        border-top-left-radius: 4px;
        background-color: rgba(12, 6, 15, 0.5);
        backdrop-filter: blur(2px);
      `}
  }
  .react-resizable-handle-sw {
    bottom: 0;
    left: 0;
    cursor: sw-resize;
    transform: rotate(90deg);
  }
  .react-resizable-handle-se {
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }
  .react-resizable-handle-nw {
    top: 0;
    left: 0;
    cursor: nw-resize;
    transform: rotate(180deg);
  }
  .react-resizable-handle-ne {
    top: 0;
    right: 0;
    cursor: ne-resize;
    transform: rotate(270deg);
  }
  .react-resizable-handle-w,
  .react-resizable-handle-e {
    top: 50%;
    margin-top: -10px;
    cursor: ew-resize;
  }
  .react-resizable-handle-w {
    left: 0;
    transform: rotate(135deg);
  }
  .react-resizable-handle-e {
    right: 0;
    transform: rotate(315deg);
  }
  .react-resizable-handle-n,
  .react-resizable-handle-s {
    left: 50%;
    margin-left: -10px;
    cursor: ns-resize;
  }
  .react-resizable-handle-n {
    top: 0;
    transform: rotate(225deg);
  }
  .react-resizable-handle-s {
    bottom: 0;
    transform: rotate(45deg);
  }
`;

const ImageContainerParent = styled.div`
  display: inline-block;
`

function ImageComponent({ image }: { image: ImageProps }) {
  const { key, src, width, height, isResized } = image;
  const [selection, setSelection] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [currentSize, setCurrentSize] = useState({
    width,
    height,
  });

  const handleClick = useCallback(() => {
    setSelection(true);
  }, [setSelection]);

  const containerRef = useDivClickOutside(() => {
    if (selection) {
      setSelection(false);
    }
  }, false);

  const handleResize = useCallback(
    (e: React.SyntheticEvent, { size }: ResizeCallbackData) => {
      editor.update(() => {
        if (key) {
          const node = $getNodeByKey(key) as ImageNode;
          node.update({
            width: size.width,
            height: size.height,
            isResized: true,
          });
        }
      });
    },
    [editor, key]
  );

  useEffect(() => {
    async function getImageSize() {
      const img = new Image();
      img.src = src;
      img.onload = function () {
        setCurrentSize({
          width: img.width,
          height: img.height,
        });
      };
    }
    if (!isResized) {
      getImageSize();
    }
  }, [setCurrentSize, src, isResized]);

  return (
    <ImageContainer
      onClick={handleClick}
      $selection={selection}
      ref={containerRef}
    >
      <ImageContainerParent>
        <ResizableBox
          width={currentSize.width}
          height={currentSize.height}
          minConstraints={[100, 100]}
          maxConstraints={[800, 800]}
          lockAspectRatio={true}
          onResize={handleResize}
        >
          <img src={src} width={"100%"} height={"100%"} draggable="false" />
        </ResizableBox>
      </ImageContainerParent>
    </ImageContainer>
  );
}

export default ImageComponent;
