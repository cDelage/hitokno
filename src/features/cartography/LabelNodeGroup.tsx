import { ChangeEvent, useCallback, useState } from "react";
import { DataNode, Theme } from "../../types/Cartography.type";
import useCartography from "./useCartography";
import TextEditable from "../../ui/TextEditable";
import styled from "styled-components";
import { TextEditMode } from "../../types/TextEditMode.type";

const LabelNodeGroupStyled = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 8px;
  left: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.fill};
  color: ${(props) => props.theme.color};
  box-sizing: border-box;
  box-shadow: var(--shadow-md);
  filter: brightness(0.98);
  font-size: 20px;
`;

function LabelNodeGroup({ data, id }: { data: DataNode; id: string }) {
  const [modeRename, setModeRename] = useState<TextEditMode>("DEFAULT");
  const { setNodeData } = useCartography();

  const handleRename = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNodeData(id, { ...data, label: e.target.value });
    },
    [setNodeData, id, data]
  );

  const handleClick = useCallback(() => {
    if (modeRename !== "EDIT") {
      setModeRename("EDIT");
    }
  }, [setModeRename, modeRename]);

  const handleClickOutside = useCallback(() => {
    setModeRename("DEFAULT");
  }, []);

  return (
    <LabelNodeGroupStyled
      theme={data.shapeDescription?.theme}
      onClick={handleClick}
    >
      <TextEditable
        mode={modeRename}
        value={data.label}
        onEdit={handleRename}
        resizable={true}
        onClickOutside={handleClickOutside}
        fontSize="20px"
      />
    </LabelNodeGroupStyled>
  );
}

export default LabelNodeGroup;
