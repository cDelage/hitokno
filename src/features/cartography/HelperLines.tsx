import useCartography from "./useCartography";
import { HelperLine } from "../../types/Cartography.type";
import styled from "styled-components";
import {
  bottomHelperLine,
  centerXHelperLine,
  centerYHelperLine,
  leftHelperLine,
  rightHelperLine,
  topHelperLine,
} from "./HelperLineConstants";

const LineStyled = styled.div<{ $line: HelperLine }>`
  position: absolute;
  z-index: 200;
  background-color: var(--color-primary-600);
  ${(props) => {
    return {
      ...props.$line.position,
    };
  }};
  width: ${(props) => props.$line.width}px;
  height: ${(props) => props.$line.height}px;
  opacity: 0.8;
`;

function HelperLines({
  id,
  position,
  size,
}: {
  id: string;
  position: {
    xPos: number;
    yPos: number;
  };
  size: {
    width: number;
    height: number;
  };
}) {
  const {
    findTopAlignedNode,
    findBottomAlignedNode,
    findLeftAlignedNode,
    findRightAlignedNode,
    findCenterXAlignedNode,
    findCenterYAlignedNode,
  } = useCartography();

  const alignTop = findTopAlignedNode(id, position.yPos);
  const alignLeft = findLeftAlignedNode(id, position.xPos);
  const alignRight = findRightAlignedNode(id, position.xPos + size.width);
  const alignBottom = findBottomAlignedNode(id, position.yPos + size.height);
  const alignCenterX =
    !(alignLeft && alignRight) &&
    findCenterXAlignedNode(id, position.xPos + size.width / 2);
  const alignCenterY =
    !(alignTop && alignBottom) &&
    findCenterYAlignedNode(id, position.yPos + size.height / 2);
  return (
    <>
      {alignTop && <LineStyled $line={topHelperLine} />}
      {alignBottom && <LineStyled $line={bottomHelperLine} />}
      {alignLeft && <LineStyled $line={leftHelperLine} />}
      {alignRight && <LineStyled $line={rightHelperLine} />}
      {alignCenterX && <LineStyled $line={centerXHelperLine} />}
      {alignCenterY && <LineStyled $line={centerYHelperLine} />}
    </>
  );
}

export default HelperLines;
