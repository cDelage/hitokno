import styled from "styled-components";

type HoverBgColor = "--bg-white" | "--bg-close";
type HoverColor = "--text-layout" | "--text-close";

type WindowIconProps = {
  children: React.ReactNode;
  hoverBgColor: HoverBgColor;
  hoverColor: HoverColor;
  onClick: () => void;
};

type WindowIconButtonStyledProps = {
  $hoverBgColor: HoverBgColor;
  $hoverColor: HoverColor;
};

const WindowIconButtonStyled = styled.button<WindowIconButtonStyledProps>`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0px 16px;
  color: var(--text-layout);
  &:hover {
    background-color: var(${(props) => props.$hoverBgColor});
    color: var(${(props) => props.$hoverColor});
  }
`;

function WindowHeaderButton({
  children,
  hoverBgColor,
  hoverColor,
  onClick
}: WindowIconProps): JSX.Element {
  return (
    <WindowIconButtonStyled $hoverBgColor={hoverBgColor} $hoverColor={hoverColor} onClick={onClick}>
      {children}
    </WindowIconButtonStyled>
  );
}

export default WindowHeaderButton;
