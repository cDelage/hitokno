import { useEffect } from "react";
import {
  Handle,
  NodeProps,
  useUpdateNodeInternals,
} from "reactflow";
import styled from "styled-components";
import { DataNode } from "../../types/Cartography.type";
import PluginReadEditMode from "../lexicalPlugins/PluginReadEditMode";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import PluginUpdateNodeText from "../lexicalPlugins/PluginUpdateNodeText";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ShapeDispatch from "../cartography/shapes/ShapeDispatch";
import NodeText from "../cartography/NodeText";

const NodeShapeStyled = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
`;

const TopContainer = styled.div`
  z-index: 1;
  flex-grow: 1;
`;

const StyledCreatedHandle = styled(Handle)<{ $active?: boolean }>`
  visibility: ${(props) => (props.$active ? "visible" : "hidden")};
  width: 12px;
  height: 12px;
  background-color: white;
  border: #0284c7 1px solid;
  box-shadow: var(--shadow-md);
`;

function NodeShapeLight({
  id,
  data: {
    mode,
    editorState,
    handles,
    shapeDescription: { shape, shadow, theme, border },
  },
}: NodeProps<DataNode>): JSX.Element {

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, updateNodeInternals, id]);

  return (
    <NodeShapeStyled
    >
      <ShapeDispatch
        shape={shape}
        fill={theme.fill}
        $shadow={shadow}
        border={border ? theme.stroke : undefined}
      />
      <TopContainer>
       

        <NodeText mode={mode} editorState={editorState} theme={theme}>
          <PluginReadEditMode mode={mode} />
          <PluginUpdateNodeText id={id} />
          <HistoryPlugin />
          <ListPlugin />
        </NodeText>
        {handles.map(({ position, type, handleId }) => (
          <StyledCreatedHandle
            key={handleId}
            id={handleId}
            position={position}
            type={type}
            isConnectableStart={false}
            isConnectableEnd={false}
          />
        ))}
      </TopContainer>
    </NodeShapeStyled>
  );
}

export default NodeShapeLight;
