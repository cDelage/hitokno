import { convertToBase64 } from "../../utils/convertToBase64";
import { DataNode } from "../../types/Cartography.type";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect } from "react";
import { Node, useViewport } from "reactflow";
import useCartography from "./useCartography";
import { useSearchParams } from "react-router-dom";

function PasteImage() {
  const { addNewNode } = useCartography();
  const { x, y } = useViewport();
  const [searchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  const deckOpen = searchParams.get("deckOpen");

  const handlePasteEffect = useCallback(
    (e: KeyboardEvent) => {
      if (!sheetId && !deckOpen) {
        const isCtrlPressed = e.ctrlKey || e.metaKey;
        if (isCtrlPressed && (e.key === "V" || e.key === "v")) {
          if (navigator.clipboard) {
            convertToBase64(navigator.clipboard).then((result): void => {
              if (result) {
                const newNode: Node<DataNode> = {
                  id: uuidv4(),
                  data: {
                    label: "image",
                    handles: [],
                    mode: "DEFAULT",
                    src: result.base64Data,
                  },
                  type: "image",
                  position: {
                    x,
                    y,
                  },
                  style: {
                    width: result.width,
                    height: result.height,
                  },
                };

                addNewNode(newNode);
              }
            });
          }
        }
      }
    },
    [addNewNode, x, y, deckOpen, sheetId]
  );

  useEffect(() => {
    document.addEventListener("keydown", handlePasteEffect);
    return () => document.removeEventListener("keydown", handlePasteEffect);
  });
  return null;
}

export default PasteImage;
