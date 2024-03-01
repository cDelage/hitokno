import styled, { css } from "styled-components";


const SvgStyled = styled.svg<{cursorPointer?: boolean}>`
  ${(props) => props.cursorPointer && css`
    cursor: pointer;
  `}
`

function Star({
  fill,
  onMouseEnter,
  onMouseLeave,
  cursorPointer,
  onClick
}: {
  fill: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  cursorPointer?: boolean;
  onClick?: () => void;
}) {
  return (
    <SvgStyled
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cursorPointer={cursorPointer}
      onClick={onClick}
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
        fill={fill}
      />
    </SvgStyled>
  );
}

export default Star;
