import { BiBold, BiItalic, BiUnderline } from "react-icons/bi";
import MenuToolbar from "../../ui/MenuToolbar";
import { ToolbarSmallIcon } from "../../ui/ToolbarSmallIcon";
import FakeSelector from "../../ui/FakeSelector";
import { HiChevronDown } from "react-icons/hi2";
import TitleFormatToolbar from "../cartography/TitleFormatToolbar";
import styled from "styled-components";
import HighlightColorIcon from "../../ui/icons/HighlightColorIcon";
import { MenuBorderRight } from "../cartography/CartographyConstants";
import PenColorIcon from "../../ui/icons/PenColorIcon";
import SheetIcon from "../../ui/icons/SheetIcon";
import useCartography from "../cartography/useCartography";
import { useReactFlow, useViewport } from "reactflow";
import { useSearchParams } from "react-router-dom";
import { BiSolidTerminal } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent } from "@lexical/utils";
import { $setBlocksType, $patchStyleText } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";

const ToolbarLine = styled.div`
  display: flex;
  justify-content: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const IconContainerLarge = styled.div`
  height: 28px;
  width: 52px;
  overflow: visible;
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 160px;
`;

function SheetToolbar({ nodeId }: { nodeId: string }) {
  const [currentNode, setCurrentNode] = useState<undefined | string>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const [editor] = useLexicalComposerContext();
  const { getNodeCenterCoordinate } = useCartography();
  const { setCenter } = useReactFlow();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const { zoom } = useViewport();
  const [currentStyle, setCurrentStyle] = useState<undefined | string>(
    undefined
  );

  function handleCloseSheet() {
    const centerNode = getNodeCenterCoordinate(nodeId);
    setCenter(centerNode.x, centerNode.y, { duration: 200, zoom });
    searchParams.delete("sheetId");
    setSearchParams(searchParams);
  }

  const handleSetBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  }, [editor]);

  const handleSetItalic = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  }, [editor]);

  const handleSetUnderline = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
  }, [editor]);

  const handleSetTextHeading = useCallback(
    (tag: "h1" | "h2" | "h3") => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(tag));
        }
      });
    },
    [editor]
  );

  const handleSetTextParagraph = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createParagraphNode());
    });
  }, [editor]);

  const handleSetBulletList = useCallback(() => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  }, [editor]);

  const handleSetOrderedList = useCallback(() => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  }, [editor]);

  useEffect(() => {
    const removeListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));

          const fontFamily = selection.style
            .split(";")
            .filter((e) => e.includes("font-family"));
          const lastFamilyStyle = fontFamily[fontFamily.length - 1];
          setCurrentStyle(lastFamilyStyle);

          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : $findMatchingParent(anchorNode, (e) => {
                  const parent = e.getParent();
                  return parent !== null && $isRootOrShadowRoot(parent);
                });
          setCurrentNode(element?.__tag);
        }
      });
    });

    return () => {
      removeListener();
    };
  }, [editor]);

  return (
    <MenuToolbar $position={{}} $isDisplayBlock={true}>
      <ToolbarLine>
        <ActionsContainer>
          <MenuToolbar.ActionLine>
            <MenuToolbar.Action onClick={handleCloseSheet}>
              <IconContainerLarge>
                <SheetIcon mode={"CLOSE"} />
              </IconContainerLarge>
            </MenuToolbar.Action>
            <MenuToolbar.Action toggle="font-family">
              <FakeSelector>
                Police <HiChevronDown size={12} />
              </FakeSelector>
            </MenuToolbar.Action>

            {/* Title */}
            <MenuToolbar.Action toggle="type-node">
              <FakeSelector>
                <TitleFormatToolbar node={"h1"} />
                <HiChevronDown size={12} />
              </FakeSelector>
            </MenuToolbar.Action>
            {/* Bold */}
            <MenuToolbar.Action onClick={handleSetBold} $active={isBold}>
              <ToolbarSmallIcon>
                <BiBold size={"100%"} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>

            {/* Italic */}
            <MenuToolbar.Action onClick={handleSetItalic} $active={isItalic}>
              <ToolbarSmallIcon>
                <BiItalic size={"100%"} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>

            {/* Underline */}
            <MenuToolbar.Action
              onClick={handleSetUnderline}
              $active={isUnderline}
            >
              <ToolbarSmallIcon>
                <BiUnderline
                  size={"100%"}
                  style={{ transform: "translateY(1px) scale(1.2)" }}
                />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
            <MenuToolbar.Action
              $padding="8px 8px 8px 16px"
              border={MenuBorderRight}
            >
              <ToolbarSmallIcon>
                <PenColorIcon
                  theme={{
                    id: "red-dark",
                    fill: "#DC2626",
                    color: "#FFFFFF",
                    stroke: "#991B1B",
                  }}
                />
              </ToolbarSmallIcon>
              <HiChevronDown size={12} />
            </MenuToolbar.Action>
            <MenuToolbar.Action
              $padding="8px 8px 8px 16px"
              border={MenuBorderRight}
            >
              <ToolbarSmallIcon>
                <HighlightColorIcon
                  theme={{
                    id: "purple-dark",
                    fill: "#4F46E5",
                    color: "#FFFFFF",
                    stroke: "#3730A3",
                  }}
                />
              </ToolbarSmallIcon>
              <HiChevronDown size={12} />
            </MenuToolbar.Action>
            <MenuToolbar.Action $padding="8px 16px 8px 16px">
              <ToolbarSmallIcon>
                <BiSolidTerminal size="100%" />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          </MenuToolbar.ActionLine>
        </ActionsContainer>
      </ToolbarLine>

      <MenuToolbar.SubMenu name="type-node" $displayBottom={true}>
        <div className="htk-theme-menu">
          <MenuToolbar.ActionColumn>
            <MenuToolbar.ActionLine>
              <MenuToolbar.Action
                onClick={() => handleSetTextHeading("h1")}
                $active={currentNode === "h1"}
                border={MenuBorderRight}
              >
                <TitleContainer>
                  <h1>Heading 1</h1>
                </TitleContainer>
              </MenuToolbar.Action>
              <MenuToolbar.Action
                onClick={handleSetBulletList}
                $active={currentNode === "ul"}
              >
                <TitleContainer>
                  <ul>
                    <li>Bullet list</li>
                  </ul>
                </TitleContainer>
              </MenuToolbar.Action>
            </MenuToolbar.ActionLine>
            <MenuToolbar.ActionLine>
              <MenuToolbar.Action
                onClick={() => handleSetTextHeading("h2")}
                $active={currentNode === "h2"}
                border={MenuBorderRight}
              >
                <TitleContainer>
                  <h2>Heading 2</h2>
                </TitleContainer>
              </MenuToolbar.Action>
              <MenuToolbar.Action
                onClick={handleSetOrderedList}
                $active={currentNode === "ol"}
              >
                <TitleContainer>
                  <ol>
                    <li>Order list</li>
                  </ol>
                </TitleContainer>
              </MenuToolbar.Action>
            </MenuToolbar.ActionLine>
            <MenuToolbar.ActionLine>
              <MenuToolbar.Action
                onClick={() => handleSetTextHeading("h3")}
                $active={currentNode === "h3"}
                border={MenuBorderRight}
              >
                <TitleContainer>
                  <h3>Heading 3</h3>
                </TitleContainer>
              </MenuToolbar.Action>
              <MenuToolbar.Action
                onClick={handleSetTextParagraph}
                $active={currentNode === undefined}
              >
                <TitleContainer>
                  <p>Normal</p>
                </TitleContainer>
              </MenuToolbar.Action>
            </MenuToolbar.ActionLine>
          </MenuToolbar.ActionColumn>
        </div>
      </MenuToolbar.SubMenu>
    </MenuToolbar>
  );
}

export default SheetToolbar;
