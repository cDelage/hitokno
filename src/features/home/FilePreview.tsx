import Row from "../../ui/Row";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import styled from "styled-components";
import Button from "../../ui/Button";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import IconButton from "../../ui/IconButton";
import { useLocation, useNavigate } from "react-router-dom";

const ViewportContainer = styled.div`
  height: 268px;
  box-shadow: var(--shadow-md);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FilePreview({ children }: ChildrenProps): JSX.Element {
  return (
    <Row $flexDirection="column" $gap={20}>
      {children}
    </Row>
  );
}

function Title({ children }: ChildrenProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const closable = location.pathname !== "/explorer";

  return (
    <Row
      $flexDirection="row"
      $gap={0}
      $alignItems="center"
      $justifyContent="space-between"
    >
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
    <Row $flexDirection="column" $gap={8}>
      <ViewportContainer>{children}</ViewportContainer>
      <Row
        $flexDirection="row"
        $gap={4}
        $alignItems="center"
        $justifyContent="center"
      >
        {title}
      </Row>
    </Row>
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
    <Row $flexDirection="column" $gap={8}>
      <Button type="primary" disabled={disabled} onClick={displayFile}>
        Display file
      </Button>
      <Button type="primary" disabled={disabled} onClick={editFile}>
        Edit file
      </Button>
      <Button type="primary" disabled={disabled} onClick={executeATest}>
        Execute a test
      </Button>
    </Row>
  );
}

FilePreview.Title = Title;
FilePreview.Viewport = Viewport;
FilePreview.Actions = Actions;

export default FilePreview;
