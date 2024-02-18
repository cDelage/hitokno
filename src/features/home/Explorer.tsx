import styled from "styled-components";
import { IoFolderOpenOutline } from "react-icons/io5";
import { device } from "../../Medias";
import CreationButton from "../../ui/CreationButton";
import { IoAdd } from "react-icons/io5";
import { useCreateFolder } from "./useCreateFolder";
import Spinner from "../../ui/Spinner";
import FolderExplorer from "./FolderExplorer";
import { useFindRepository } from "./useFindRepository";

const ExplorerStyled = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${device.lg} {
    flex: 3;
  }
`;

const ExplorerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.h1`
  color: var(--text-main-active);
`;

const ExplorerMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function Explorer(): JSX.Element {
  const { repository, isRepositoryLoading } = useFindRepository();
  const { isPending, createFolder } = useCreateFolder();

  function handleCreateFolder() {
    createFolder();
  }

  return (
    <ExplorerStyled>
      <ExplorerHeader>
        <TitleContainer>
          <IoFolderOpenOutline size={28} />
          Explorer
        </TitleContainer>
        <CreationButton
          $isContainIcon={true}
          onClick={handleCreateFolder}
          disabled={isPending}
        >
          <IoAdd size={20} /> New folder
        </CreationButton>
      </ExplorerHeader>
      <ExplorerMain>
        {isRepositoryLoading ? (
          <Spinner />
        ) : (
          <>
            {repository?.map((folder) => (
              <FolderExplorer key={folder._id} folder={folder} />
            ))}
          </>
        )}
      </ExplorerMain>
    </ExplorerStyled>
  );
}

export default Explorer;
