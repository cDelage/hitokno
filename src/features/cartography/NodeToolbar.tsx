import styled from "styled-components";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import MenuToolbar from "../../ui/MenuToolbar";
import ShapesIcon from "../../ui/icons/ShapesIcon";
import { HiChevronUp } from "react-icons/hi2";
import ColorNodeIcon from "../../ui/icons/ColorNodeIcon";
import ShadowIcon from "../../ui/icons/ShadowIcon";
import { BiBold, BiItalic, BiUnderline, BiPen } from "react-icons/bi";
import {
  MenuBorderRight,
  ShadowsMenu,
  ShapeMenu,
  ThemeLight,
  ThemesDark,
  fontFamilies,
} from "./CartographyConstants";
import OpenSheetIcon from "../../ui/icons/OpenSheetIcon";
import useNodeToolbar from "./useNodeToolbar";
import FakeSelector from "../../ui/FakeSelector";
import useCartography from "./useCartography";
import {
  FontMenu,
  NodeMode,
  Shadow,
  ShadowProps,
  Shape,
  Theme,
} from "../../types/Cartography.type";
import ShapeDispatch from "./shapes/ShapeDispatch";
import { ToolbarSmallIcon } from "../../ui/ToolbarSmallIcon";
import { RxBorderAll } from "react-icons/rx";
import { RxBorderNone } from "react-icons/rx";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { $setBlocksType, $patchStyleText } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { useCallback, useEffect, useState } from "react";
import { $findMatchingParent } from "@lexical/utils";
import TitleFormatToolbar from "./TitleFormatToolbar";

const ShapeContainer = styled.div`
  height: 40px;
  width: 40px;
  overflow: visible;
  position: relative;
`;

const IconContainerLarge = styled.div`
  height: 28px;
  width: 52px;
  overflow: visible;
  display: flex;
  align-items: center;
`;

const ShadowDiv = styled.div<ShadowProps>`
  height: 24px;
  width: 24px;
  border-radius: 4px;
  background-color: var(--color-gray-100);
  border: solid 2px var(--color-gray-300);
  box-shadow: ${(props) => props.shadow};
`;

const TitleContainer = styled.div`
  width: 160px;
`;

type FontFamilyProp = {
  fontFamily: string;
};
const FontFamilyStyled = styled.div<FontFamilyProp>`
  font-family: ${(props) => props.fontFamily};
  padding: 0px 16px 0px 0px;
  font-size: 1.2rem;
`;

function NodeToolbar({
  id,
  mode,
}: {
  id: string;
  mode: NodeMode;
}): JSX.Element | null {
  const { positionToolbar, selectedNodeId } = useNodeToolbar();
  const { getNodeData, setNodeData, toggleEditMode } = useCartography();
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [currentNode, setCurrentNode] = useState<undefined | string>(undefined);
  const [currentStyle, setCurrentStyle] = useState<undefined | string>(
    undefined
  );

  const data = getNodeData(selectedNodeId);
  const currentPolice: FontMenu | undefined =
    fontFamilies.find((family) => currentStyle?.includes(family.fontCss)) ??
    fontFamilies[0];

  const handleSetTheme = useCallback(
    (theme: Theme) => {
      setNodeData(selectedNodeId, {
        ...data,
        shapeDescription: {
          ...data.shapeDescription,
          theme,
        },
      });
    },
    [data, selectedNodeId, setNodeData]
  );

  const handleSetShadow = useCallback(
    (shadow: Shadow) => {
      setNodeData(selectedNodeId, {
        ...data,
        shapeDescription: {
          ...data.shapeDescription,
          shadow,
        },
      });
    },
    [data, selectedNodeId, setNodeData]
  );

  const handleSetShape = useCallback(
    (shape: Shape) => {
      setNodeData(selectedNodeId, {
        ...data,
        shapeDescription: {
          ...data.shapeDescription,
          shape,
        },
      });
    },
    [data, selectedNodeId, setNodeData]
  );

  const handleSetBorder = useCallback(
    (border: boolean) => {
      setNodeData(selectedNodeId, {
        ...data,
        shapeDescription: {
          ...data.shapeDescription,
          border,
        },
      });
    },
    [data, selectedNodeId, setNodeData]
  );

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

  if (!positionToolbar.top || !selectedNodeId || selectedNodeId !== id || !data)
    return null;

  const {
    shapeDescription: { theme, shadow, shape, border },
  } = data;

  return (
    <MenuToolbar $position={{ ...positionToolbar }}>
      <MenuToolbar.ActionLine>
        {/* Shapes (select rect, ellipse, triangle...) */}
        <MenuToolbar.ToggleSubMenu name="shape">
          <MenuToolbar.Action $padding="8px 4px 8px 8px">
            <ToolbarSmallIcon>
              <ShapesIcon />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>

        {/* Color of the shape */}
        <MenuToolbar.ToggleSubMenu name="color">
          <MenuToolbar.Action $padding="8px 4px 8px 8px">
            <ToolbarSmallIcon>
              <ColorNodeIcon fill={theme.fill} />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>

        {/* Stroke of the shape */}
        <MenuToolbar.ToggleSubMenu name="stroke">
          <MenuToolbar.Action $padding="8px 4px 8px 8px">
            <ToolbarSmallIcon>
              <RxBorderAll size={"100%"} />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>

        {/* Shadow */}
        <MenuToolbar.ToggleSubMenu name="shadow">
          <MenuToolbar.Action
            border={MenuBorderRight}
            $padding="8px 4px 8px 8px"
          >
            <ToolbarSmallIcon>
              <ShadowIcon />
            </ToolbarSmallIcon>
            <HiChevronUp size={12} />
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>

        {/* Edit */}
        <MenuToolbar.Action
          onClick={() => {
            toggleEditMode(id);
          }}
          $active={mode === "EDIT"}
        >
          <ToolbarSmallIcon>
            <BiPen size={"100%"} />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>

        {/* Police */}
        <MenuToolbar.ToggleSubMenu name="font-family">
          <MenuToolbar.Action>
            <FakeSelector fontFamily={currentPolice.fontCss}>
              {currentPolice?.fontName} <HiChevronUp size={12} />
            </FakeSelector>
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>

        {/* Title */}
        <MenuToolbar.ToggleSubMenu name="type-node">
          <MenuToolbar.Action>
            <FakeSelector>
              <TitleFormatToolbar node={currentNode} />
              <HiChevronUp size={12} />
            </FakeSelector>
          </MenuToolbar.Action>
        </MenuToolbar.ToggleSubMenu>

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
        <MenuToolbar.Action onClick={handleSetUnderline} $active={isUnderline}>
          <ToolbarSmallIcon>
            <BiUnderline
              size={"100%"}
              style={{ transform: "translateY(1px)" }}
            />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>

        {/* Open sheet */}
        <MenuToolbar.Action>
          <IconContainerLarge>
            <OpenSheetIcon />
          </IconContainerLarge>
        </MenuToolbar.Action>
      </MenuToolbar.ActionLine>

      {/*
       * SUBMENUS
       */}

      <MenuToolbar.SubMenu name="color">
        <MenuToolbar.ActionLine>
          {ThemesDark.map((themeDark) => (
            <MenuToolbar.Action
              key={themeDark.fill}
              $active={themeDark.id === theme.id}
              onClick={() => handleSetTheme(themeDark)}
            >
              <ToolbarSmallIcon>
                <ColorNodeIcon fill={themeDark.fill} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
        <MenuToolbar.ActionLine>
          {ThemeLight.map((themeLight) => (
            <MenuToolbar.Action
              key={themeLight.fill}
              $active={themeLight.id === theme.id}
              onClick={() => handleSetTheme(themeLight)}
            >
              <ToolbarSmallIcon>
                <ColorNodeIcon fill={themeLight.fill} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>
      <MenuToolbar.SubMenu name="shadow">
        <MenuToolbar.ActionLine>
          {ShadowsMenu.map((shadowsMenu) => (
            <MenuToolbar.Action
              key={shadowsMenu.shadow}
              $active={shadow === shadowsMenu.shadow}
              onClick={() => handleSetShadow(shadowsMenu.shadow)}
            >
              <ToolbarSmallIcon>
                <ShadowDiv shadow={shadowsMenu.shadowMenu} />
              </ToolbarSmallIcon>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="shape">
        <MenuToolbar.ActionLine>
          {ShapeMenu.map((shapeMenu) => (
            <MenuToolbar.Action
              key={shapeMenu}
              $active={shape === shapeMenu}
              onClick={() => handleSetShape(shapeMenu)}
            >
              <ShapeContainer>
                <ShapeDispatch
                  shape={shapeMenu}
                  fill={theme.fill}
                  $shadow="var(--shadow-shape-menu-md)"
                />
              </ShapeContainer>
            </MenuToolbar.Action>
          ))}
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="stroke">
        <MenuToolbar.ActionLine>
          <MenuToolbar.Action
            $active={!border}
            onClick={() => handleSetBorder(false)}
          >
            <ToolbarSmallIcon>
              <RxBorderNone size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
          <MenuToolbar.Action
            $active={border}
            onClick={() => handleSetBorder(true)}
          >
            <ToolbarSmallIcon>
              <RxBorderAll size={"100%"} />
            </ToolbarSmallIcon>
          </MenuToolbar.Action>
        </MenuToolbar.ActionLine>
      </MenuToolbar.SubMenu>

      <MenuToolbar.SubMenu name="type-node">
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
      <MenuToolbar.SubMenu name="font-family">
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

export default NodeToolbar;
