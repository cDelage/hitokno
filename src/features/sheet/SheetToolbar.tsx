import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiCode,
  BiItalic,
  BiUnderline,
} from "react-icons/bi";
import MenuToolbar from "../../ui/MenuToolbar";
import { ToolbarSmallIcon } from "../../ui/ToolbarSmallIcon";
import FakeSelector from "../../ui/FakeSelector";
import { HiChevronDown } from "react-icons/hi2";
import TitleFormatToolbar from "../cartography/TitleFormatToolbar";
import styled from "styled-components";
import HighlightColorIcon from "../../ui/icons/HighlightColorIcon";
import {
  MenuBorderRight,
  TextThemesFirstLine,
  TextThemesSecondLine,
  ThemeHighlightFirstLine,
  ThemeHighlightSecondLine,
  fontFamilies,
} from "../cartography/CartographyConstants";
import PenColorIcon from "../../ui/icons/PenColorIcon";
import SheetIcon from "../../ui/icons/SheetIcon";
import useCartography from "../cartography/useCartography";
import { useReactFlow, useViewport } from "reactflow";
import { useSearchParams } from "react-router-dom";
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
import ColorNodeIcon from "../../ui/icons/ColorNodeIcon";
import { FontMenu } from "../../types/Cartography.type";
import NoHighlightIcon from "../../ui/NoHighlightIcon";
import {
  $createCodeNode,
} from '@lexical/code';

const IconContainerLarge = styled.div`
  height: 28px;
  width: 52px;
  overflow: visible;
  display: flex;
  align-items: center;
`;

const FontFamilyStyled = styled.div<{ fontFamily: string }>`
  font-family: ${(props) => props.fontFamily};
  width: 100px;
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
  const currentPolice: FontMenu | undefined =
    fontFamilies.find((family) => currentStyle?.includes(family.fontCss)) ??
    fontFamilies[0];

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

  const handleSetFontFamily = useCallback(
    (fontFamily: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            "font-family": fontFamily,
          });
        }
      });
    },
    [editor]
  );

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [editor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value });
      window.getSelection()?.removeAllRanges();
    },
    [applyStyleText]
  );

  const formatCode = () => {
      editor.update(() => {
        let selection = $getSelection();

        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection))
              selection.insertRawText(textContent);
          }
        }
      });
  };

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
      <MenuToolbar.ActionLine>
        <MenuToolbar.Action onClick={handleCloseSheet}>
          <IconContainerLarge>
            <SheetIcon mode={"CLOSE"} />
          </IconContainerLarge>
        </MenuToolbar.Action>
        <MenuToolbar.Action toggle="font-family" $justifyCenter={true}>
          <FakeSelector fontFamily={currentPolice.fontCss}>
            {currentPolice?.fontName} <HiChevronDown size={12} />
          </FakeSelector>
        </MenuToolbar.Action>

        {/* Title */}
        <MenuToolbar.Action toggle="type-node" $justifyCenter={true}>
          <FakeSelector>
            <TitleFormatToolbar node={currentNode} />
            <HiChevronDown size={12} />
          </FakeSelector>
        </MenuToolbar.Action>
        {/* Bold */}
        <MenuToolbar.Action
          onClick={handleSetBold}
          $active={isBold}
          $justifyCenter={true}
        >
          <ToolbarSmallIcon>
            <BiBold size={"100%"} />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>

        {/* Italic */}
        <MenuToolbar.Action
          onClick={handleSetItalic}
          $active={isItalic}
          $justifyCenter={true}
        >
          <ToolbarSmallIcon>
            <BiItalic size={"100%"} />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>

        {/* Underline */}
        <MenuToolbar.Action
          onClick={handleSetUnderline}
          $active={isUnderline}
          $justifyCenter={true}
        >
          <ToolbarSmallIcon>
            <BiUnderline
              size={"100%"}
              style={{ transform: "translateY(1px) scale(1.2)" }}
            />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>

        {/* Align */}
        <MenuToolbar.Action
          toggle="alignement"
          border={MenuBorderRight}
          $isAlignRight={true}
          $justifyCenter={true}
        >
          <ToolbarSmallIcon>
            <BiAlignLeft size={"100%"} />
          </ToolbarSmallIcon>
          <HiChevronDown size={12} />
        </MenuToolbar.Action>
        <MenuToolbar.Action
          border={MenuBorderRight}
          toggle="pen-color"
          $isAlignRight={true}
          $justifyCenter={true}
        >
          <ToolbarSmallIcon>
            <PenColorIcon
             fill={"#E24"}
            />
          </ToolbarSmallIcon>
          <HiChevronDown size={12} />
        </MenuToolbar.Action>
        <MenuToolbar.Action
          border={MenuBorderRight}
          toggle="highlight-color"
          $isAlignRight={true}
          $justifyCenter={true}
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
        <MenuToolbar.Action border={MenuBorderRight} $justifyCenter={true} onClick={formatCode}>
          <ToolbarSmallIcon>
            <BiCode size="100%" />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>
      </MenuToolbar.ActionLine>

      <MenuToolbar.SubMenu name="type-node" $displayBottom={true}>
        <div className="htk-theme-menu">
          <MenuToolbar.ActionColumn>
            <MenuToolbar.ActionLine>
              <MenuToolbar.Action
                onClick={() => handleSetTextHeading("h1")}
                $active={currentNode === "h1"}
                border={MenuBorderRight}
                $justifyCenter={true}
              >
                <TitleContainer>
                  <h1>Heading 1</h1>
                </TitleContainer>
              </MenuToolbar.Action>
              <MenuToolbar.Action
                onClick={handleSetBulletList}
                $active={currentNode === "ul"}
                $justifyCenter={true}
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
                $justifyCenter={true}
              >
                <TitleContainer>
                  <h2>Heading 2</h2>
                </TitleContainer>
              </MenuToolbar.Action>
              <MenuToolbar.Action
                onClick={handleSetOrderedList}
                $active={currentNode === "ol"}
                $justifyCenter={true}
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
                $justifyCenter={true}
              >
                <TitleContainer>
                  <h3>Heading 3</h3>
                </TitleContainer>
              </MenuToolbar.Action>
              <MenuToolbar.Action
                onClick={handleSetTextParagraph}
                $active={currentNode === undefined}
                $justifyCenter={true}
              >
                <TitleContainer>
                  <p>Normal</p>
                </TitleContainer>
              </MenuToolbar.Action>
            </MenuToolbar.ActionLine>
          </MenuToolbar.ActionColumn>
        </div>
      </MenuToolbar.SubMenu>
      <MenuToolbar.SubMenu
        name="alignement"
        $displayBottom={true}
        $alignRight={true}
      >
        <MenuToolbar.ActionLine>
          <MenuToolbar.Action>
            <ToolbarSmallIcon>
              <BiAlignLeft size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
          <MenuToolbar.Action>
            <ToolbarSmallIcon>
              <BiAlignRight size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
          <MenuToolbar.Action>
            <ToolbarSmallIcon>
              <BiAlignMiddle size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
          <MenuToolbar.Action>
            <ToolbarSmallIcon>
              <BiAlignJustify size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu
        name="pen-color"
        $displayBottom={true}
        $alignRight={true}
      >
        <MenuToolbar.ActionColumn>
          <MenuToolbar.ActionLine>
            {TextThemesFirstLine.map((themeText) => (
              <MenuToolbar.Action
                key={themeText.color}
                onClick={() => {
                  onFontColorSelect(themeText.color);
                }}
              >
                <ToolbarSmallIcon>
                  <ColorNodeIcon fill={themeText.color} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
          <MenuToolbar.ActionLine>
            {TextThemesSecondLine.map((themeText) => (
              <MenuToolbar.Action
                key={themeText.color}
                onClick={() => {
                  onFontColorSelect(themeText.color);
                }}
              >
                <ToolbarSmallIcon>
                  <ColorNodeIcon fill={themeText.color} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
        </MenuToolbar.ActionColumn>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu
        name="highlight-color"
        $displayBottom={true}
        $alignRight={true}
      >
        <MenuToolbar.ActionColumn>
          <MenuToolbar.ActionLine>
            {ThemeHighlightFirstLine.map((themeLight) => (
              <MenuToolbar.Action
                key={themeLight.fill}
                onClick={() => {
                  onBgColorSelect(themeLight.fill);
                }}
              >
                <ToolbarSmallIcon>
                  <ColorNodeIcon fill={themeLight.fill} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
          <MenuToolbar.ActionLine>
            <MenuToolbar.Action
              onClick={() => {
                onBgColorSelect("none");
              }}
            >
              <ToolbarSmallIcon>
                <NoHighlightIcon />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
            {ThemeHighlightSecondLine.map((themeLight) => (
              <MenuToolbar.Action
                key={themeLight.fill}
                onClick={() => {
                  onBgColorSelect(themeLight.fill);
                }}
              >
                <ToolbarSmallIcon>
                  <ColorNodeIcon fill={themeLight.fill} />
                </ToolbarSmallIcon>
              </MenuToolbar.Action>
            ))}
          </MenuToolbar.ActionLine>
        </MenuToolbar.ActionColumn>
      </MenuToolbar.SubMenu>
      <MenuToolbar.SubMenu name="font-family" $displayBottom={true}>
        <MenuToolbar.ActionColumn>
          {fontFamilies.map((fontFamily) => (
            <MenuToolbar.Action
              key={fontFamily.fontName}
              onClick={() => handleSetFontFamily(fontFamily.fontCss)}
              $active={currentPolice.fontCss === fontFamily.fontCss}
            >
              <FontFamilyStyled fontFamily={fontFamily.fontCss}>
                {fontFamily.fontName}
              </FontFamilyStyled>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionColumn>
      </MenuToolbar.SubMenu>
    </MenuToolbar>
  );
}

export default SheetToolbar;
