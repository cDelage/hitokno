import styled, { CSSProp } from "styled-components";
import Row, { Column } from "../../ui/Row";
import { IoChevronBack } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useCallback } from "react";
import { MdOutlineSyncAlt } from "react-icons/md";
import NodeControlSortList from "./NodeControlSortList";

const NodeControlSidebarStyled = styled.div`
  position: absolute;
  top: 16px;
  bottom: 16px;
  width: 400px;
  z-index: 110;
  overflow: hidden;
  border: 1px solid var(--color-gray-300);
  background-color: var(--bg-element);
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
`;

const RightCloseModalStyle: CSSProp = {
  height: "100%",
  backgroundColor: "var(--color-gray-100)",
  justifyContent: "space-between",
  boxSizing: "border-box",
  padding: "8px 4px",
  cursor: "pointer",
  color: "var(--text-main-medium)",
};

const RightCloseModalHoverStyle: CSSProp = {
  backgroundColor: "var(--color-gray-200)",
};

const LeftContainerStyle: CSSProp = {
  flexGrow: 1,
};

const RowContainerStyle: CSSProp = {
  height: "100%",
};

const Title = styled.h1`
  padding: 8px;
  border-bottom: 1px solid var(--color-gray-300);
`;

function NodeControlSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nodeControlSidebarActive = searchParams.get("nodeControlSidebar");

  const handleCloseSheet = useCallback(() => {
    searchParams.delete("nodeControlSidebar");
    setSearchParams(searchParams);
  }, [setSearchParams, searchParams]);
  return (
    <CSSTransition
      in={nodeControlSidebarActive !== null}
      timeout={200}
      classNames="node-control"
      unmountOnExit
      mountOnEnter
    >
      <NodeControlSidebarStyled>
        <Row $style={RowContainerStyle}>
          <Column $style={LeftContainerStyle}>
            <Title><MdOutlineSyncAlt transform="rotate(90)" size={20}/>Node control</Title>
            <NodeControlSortList/>
          </Column>
          <Column
            $style={RightCloseModalStyle}
            $hover={RightCloseModalHoverStyle}
            onClick={handleCloseSheet}
          >
            <IoChevronBack />
            <IoChevronBack />
          </Column>
        </Row>
      </NodeControlSidebarStyled>
    </CSSTransition>
  );
}

export default NodeControlSidebar;
