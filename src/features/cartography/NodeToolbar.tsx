import styled from "styled-components";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { v4 as uuidv4 } from "uuid";
import MenuToolbar from "../../ui/MenuToolbar";
import ShapesIcon from "../../ui/icons/ShapesIcon";
import { HiChevronUp } from "react-icons/hi2";
import ColorNodeIcon from "../../ui/icons/ColorNodeIcon";
import ShadowIcon from "../../ui/icons/ShadowIcon";
import { BiBold, BiItalic, BiUnderline, BiPen, BiTrash } from "react-icons/bi";
import {
  MenuBorderRight,
  ShadowsMenu,
  ShapeMenu,
  ThemeLight,
  ThemesDark,
  fontFamilies,
} from "./CartographyConstants";
import SheetIcon from "../../ui/icons/SheetIcon";
import useNodeToolbar from "./useNodeToolbar";
import FakeSelector from "../../ui/FakeSelector";
import useCartography from "./useCartography";
import {
  FontMenu,
  NodeMode,
  Shadow,
  ShadowProps,
  Shape,
  SheetToolbarMode,
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
import { useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useReactFlow, useViewport } from "reactflow";

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

const OptionContainer = styled.span<{ color?: string }>`
  display: flex;
  gap: 4px;
`;

const FontFamilyStyled = styled.div<{fontFamily : string}>`
  font-family: ${(props) => props.fontFamily};
  width: 100px;
`;

function NodeToolbar({
  id,
  mode,
}: {
  id: string;
  mode: NodeMode;
}): JSX.Element | null {
  const { positionToolbar, selectedNodeId } = useNodeToolbar();
  const {
    getNodeData,
    setNodeData,
    toggleEditMode,
    deleteNode,
    getNodeCenterCoordinate,
  } = useCartography();
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [currentNode, setCurrentNode] = useState<undefined | string>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const { zoom } = useViewport();
  const sheetId = searchParams.get("sheetId");
  const { setCenter } = useReactFlow();

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

  const handleCreateSheet = useCallback(() => {
    setNodeData(selectedNodeId, {
      ...data,
      sheet: {
        sheetId: uuidv4(),
      },
    });
  }, [setNodeData, data, selectedNodeId]);

  const handleOpenSheet = useCallback(
    (sheetId: string) => {
      const centerNode = getNodeCenterCoordinate(id);
      const gapXScreen = (window.innerWidth - 800) / 2 / zoom;
      const newXPos = centerNode.x + gapXScreen;

      setCenter(newXPos, centerNode.y, { duration: 200, zoom });
      setSearchParams({ sheetId });
    },
    [setSearchParams, setCenter, zoom, id, getNodeCenterCoordinate]
  );

  const handleCloseSheet = useCallback(() => {
    const centerNode = getNodeCenterCoordinate(id);
    setCenter(centerNode.x, centerNode.y, { duration: 200, zoom });
    searchParams.delete("sheetId");
    setSearchParams(searchParams);
  }, [
    setSearchParams,
    searchParams,
    setCenter,
    getNodeCenterCoordinate,
    id,
    zoom,
  ]);

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
    sheet,
  } = data;

  const sheetMode: SheetToolbarMode = sheet
    ? sheetId === sheet.sheetId
      ? "CLOSE"
      : "OPEN"
    : "CREATE";

  function sheetCallback() {
    if (sheetMode === "CREATE") {
      handleCreateSheet();
    } else if (sheetMode === "CLOSE") {
      handleCloseSheet();
    } else if (sheetMode === "OPEN") {
      handleOpenSheet(sheet?.sheetId as string);
    }
  }

  return (
    <MenuToolbar
      $position={{ ...positionToolbar, transform: "translate(-50%,-130%)" }}
    >
      <MenuToolbar.ActionLine>
        {/* Shapes (select rect, ellipse, triangle...) */}
        <MenuToolbar.Action $padding="8px 4px 8px 8px" toggle="shape">
          <ToolbarSmallIcon>
            <ShapesIcon />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>

        {/* Color of the shape */}
        <MenuToolbar.Action $padding="8px 4px 8px 8px" toggle="color">
          <ToolbarSmallIcon>
            <ColorNodeIcon fill={theme.fill} />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>

        {/* Stroke of the shape */}
        <MenuToolbar.Action $padding="8px 4px 8px 8px" toggle="stroke">
          <ToolbarSmallIcon>
            <RxBorderAll size={"100%"} />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>

        {/* Shadow */}
        <MenuToolbar.Action
          border={MenuBorderRight}
          $padding="8px 4px 8px 8px"
          toggle="shadow"
        >
          <ToolbarSmallIcon>
            <ShadowIcon />
          </ToolbarSmallIcon>
          <HiChevronUp size={12} />
        </MenuToolbar.Action>

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

        {/* Trash */}
        <MenuToolbar.Action toggle="delete-node">
          <ToolbarSmallIcon>
            <BiTrash size={"100%"} />
          </ToolbarSmallIcon>
        </MenuToolbar.Action>

        {mode === "EDIT" && (
          <>
            {/* Police */}
            <MenuToolbar.Action toggle="font-family">
              <FakeSelector fontFamily={currentPolice.fontCss}>
                {currentPolice?.fontName} <HiChevronUp size={12} />
              </FakeSelector>
            </MenuToolbar.Action>

            {/* Title */}
            <MenuToolbar.Action toggle="type-node">
              <FakeSelector>
                <TitleFormatToolbar node={currentNode} />
                <HiChevronUp size={12} />
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
          </>
        )}

        {/* Open sheet */}
        <MenuToolbar.Action onClick={sheetCallback}>
          <IconContainerLarge>
            <SheetIcon mode={sheetMode} />
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
      <MenuToolbar.SubMenu name="delete-node">
        <MenuToolbar.ActionColumn>
          <MenuToolbar.Action $theme="danger" onClick={() => deleteNode(id)}>
            <OptionContainer>
              <BiTrash size={20} /> Delete
            </OptionContainer>
          </MenuToolbar.Action>
          <MenuToolbar.Action>
            <OptionContainer>
              <IoClose size={20} /> Cancel
            </OptionContainer>
          </MenuToolbar.Action>
        </MenuToolbar.ActionColumn>
      </MenuToolbar.SubMenu>
    </MenuToolbar>
  );
}

export default NodeToolbar;
