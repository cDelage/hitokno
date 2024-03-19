import styled from "styled-components";
import Resizer from "./Resizer";
import { DataNode, Theme } from "../../types/Cartography.type";
import LabelNodeGroup from "./LabelNodeGroup";

const NodeGroupStyled = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const NodeGroupBackground = styled.div<{ theme: Theme }>`
  height: 100%;
  width: 100%;
  position: relative;
  box-shadow: var(--shadow-md);
  box-sizing: border-box;
  border: ${(props) => props.theme.stroke} 1px solid;
  background-color: ${(props) => props.theme.fill};
  opacity: 0.5;
  border-radius: 8px;
`;

function NodeGroup({
  id,
  selected,
  data,
}: {
  id: string;
  selected: boolean;
  data: DataNode;
}) {
  const { shapeDescription } = data;
  return (
    <NodeGroupStyled>
      <NodeGroupBackground theme={shapeDescription?.theme} />
      <LabelNodeGroup data={data} id={id} />
      <Resizer id={id} selected={selected} />
    </NodeGroupStyled>
  );
}

export default NodeGroup;
