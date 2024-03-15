import { ReactNode } from "react";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components";
import Menu from "./Menu";

const ButtonContainer = styled.div`
  display: flex;
  border-radius: 4px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all 200ms;
  `;

const LeftButton = styled.button`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 4px 8px;

  overflow: hidden;
  background-color: inherit;
  border: none;
  border-right: 1px var(--color-gray-300) solid;
  
  display: flex;
  gap: 4px;
  font-size: 1rem;
  cursor: pointer;
  align-items: center;
  overflow: hidden;
  
  &:hover {
    background-color: var(--color-gray-200);
  }
`;

const RightButton = styled.button`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  background-color: inherit;
  border: none;
  display: flex;
  gap: 4px;
  padding: 2px;
  font-size: 1rem;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: var(--color-gray-200);
  }
`;

export function ButtonMenu({ children, tabs, onClick }: { children: ReactNode, tabs: ReactNode, onClick?: () => void }) {
  return (
    <ButtonContainer onClick={onClick}>
      <LeftButton>{children}</LeftButton>
      <RightButton>
        <Menu>
          <Menu.Toggle id="button-menu" isStyleNotApplied={true}>
            <BiChevronDown />
          </Menu.Toggle>
          <Menu.ListTabs>
            {tabs}
          </Menu.ListTabs>
        </Menu>
      </RightButton>
    </ButtonContainer>
  );
}
