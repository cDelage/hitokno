import { IoChevronForwardOutline, IoFolderOutline } from "react-icons/io5";
import { IoFolderOpen } from "react-icons/io5";
import styled from "styled-components";

const FolderOpenIcon = styled(IoFolderOpen)`
  color: var(--text-main-blue);
`;

const FolderIconsContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

type FolderStateProps = {
  isFolderOpen: boolean;
};


/**
 * Icon switchable between open and collapse folder in folder explorer line.
 * @param param0 
 * @returns 
 */

export function FolderStateIcon({ isFolderOpen }: FolderStateProps) {
  const chevronStyle = {
    transform: isFolderOpen ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform .2s ease-out",
  };

  return (
    <FolderIconsContainer>
      <IoChevronForwardOutline style={chevronStyle} />
      {isFolderOpen ? (
        <FolderOpenIcon size={20} />
      ) : (
        <IoFolderOutline size={20} />
      )}
    </FolderIconsContainer>
  );
}
