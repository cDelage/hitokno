import Row, { Column } from "../../ui/Row";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import styled from "styled-components";
import Button from "../../ui/Button";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import IconButton from "../../ui/IconButton";
import { useLocation, useNavigate } from "react-router-dom";
import ReactFlow, { Edge, EdgeTypes, Node } from "reactflow";
import NodeShapeLight from "./NodeShapeLight";
import EdgeCustomLight from "./EdgeCustomLight";

const ViewportContainer = styled.div`
  height: 268px;
  box-shadow: var(--shadow-md);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FilePreview({ children }: ChildrenProps): JSX.Element {
  return <Column $gap={20}>{children}</Column>;
}

function Title({ children }: ChildrenProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const closable = location.pathname !== "/explorer";

  return (
    <Row $style={{ alignItems: "center", justifyContent: "space-between" }}>
      <h1>{children}</h1>
      {closable && (
        <IconButton onClick={() => navigate("/explorer")}>
          <IoClose size={20} />
        </IconButton>
      )}
    </Row>
  );
}

type ViewportProps = ChildrenProps & {
  title: ReactNode;
};

function Viewport({ children, title }: ViewportProps) {
  return (
    <Column $gap={8}>
      <ViewportContainer>{children}</ViewportContainer>
      <Row $gap={4} $style={{ alignItems: "center", justifyContent: "center" }}>
        {title}
      </Row>
    </Column>
  );
}

function CartographyPreview({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={{shape: NodeShapeLight}}
      edgeTypes={{custom : EdgeCustomLight} as EdgeTypes}
      snapToGrid={true}
      panOnDrag={[]}
      snapGrid={[8, 8]}
      minZoom={0.3}
      maxZoom={0.3}
      
      fitView
    ></ReactFlow>
  );
}

type ActionProps = {
  disabled: boolean;
  displayFile?: () => void;
  editFile?: () => void;
  executeATest?: () => void;
};

function Actions({
  disabled,
  displayFile,
  editFile,
  executeATest,
}: ActionProps): JSX.Element {
  return (
    <Column $gap={8}>
      <Button type="primary" disabled={disabled} onClick={displayFile}>
        Display file
      </Button>
      <Button type="primary" disabled={disabled} onClick={editFile}>
        Edit file
      </Button>
      <Button type="primary" disabled={disabled} onClick={executeATest}>
        Execute a test
      </Button>
    </Column>
  );
}

FilePreview.Title = Title;
FilePreview.Viewport = Viewport;
FilePreview.Actions = Actions;
FilePreview.CartographyPreview = CartographyPreview;

export default FilePreview;
