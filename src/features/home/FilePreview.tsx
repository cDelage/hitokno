import Row, { Column } from "../../ui/Row";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import styled from "styled-components";
import Button from "../../ui/Button";
import { ReactNode } from "react";
import { IoClose, IoEye, IoPlay } from "react-icons/io5";
import IconButton from "../../ui/IconButton";
import { useLocation, useNavigate } from "react-router-dom";
import ReactFlow, { Edge, EdgeTypes, Node } from "reactflow";
import NodeShapeLight from "./NodeShapeLight";
import EdgeCustomLight from "./EdgeCustomLight";
import { BiPen } from "react-icons/bi";

const NodesTypesList = { shape: NodeShapeLight };

const EdgeTypesList: EdgeTypes = { custom: EdgeCustomLight } as EdgeTypes;

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
      nodeTypes={NodesTypesList}
      edgeTypes={EdgeTypesList}
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
  disableExecuteATest?: boolean;
  children?: ReactNode;
};

function Actions({
  disabled,
  displayFile,
  editFile,
  executeATest,
  disableExecuteATest,
  children,
}: ActionProps): JSX.Element {
  return (
    <Column $gap={8}>
      <Button type="primary" disabled={disabled} onClick={displayFile}>
        <IoEye /> Display file
      </Button>
      <Button type="primary" disabled={disabled} onClick={editFile}>
        <BiPen size={20} /> Edit file
      </Button>
      <Button
        type="primary"
        disabled={disabled || disableExecuteATest}
        onClick={executeATest}
      >
        <IoPlay size={20} /> Execute a test
      </Button>
      {children}
    </Column>
  );
}

FilePreview.Title = Title;
FilePreview.Viewport = Viewport;
FilePreview.Actions = Actions;
FilePreview.CartographyPreview = CartographyPreview;

export default FilePreview;
