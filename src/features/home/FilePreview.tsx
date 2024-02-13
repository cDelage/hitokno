import Row from "../../ui/Row";
import { ChildrenProps } from "../../types/ChildrenProps.type";
import styled from "styled-components";

const ViewportContainer = styled.div`
  height: 268px;
  box-shadow: var(--shadow-md);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FilePreview({ children }: ChildrenProps): JSX.Element {
  return (
    <Row flexDirection="column" gap={20}>
      {children}
    </Row>
  );
}

function Title({ children }: ChildrenProps): JSX.Element {
  return <h1>{children}</h1>;
}

function Viewport({children} : ChildrenProps) {
  return <Row flexDirection="column" gap={8}>
    <ViewportContainer>
      {children}
    </ViewportContainer>
  </Row>;
}

FilePreview.Title = Title;
FilePreview.Viewport = Viewport;

export default FilePreview;
