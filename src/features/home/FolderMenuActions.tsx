import {
  IoEllipsisHorizontal,
  IoPlay,
  IoPencil,
  IoCodeDownload,
  IoTrash,
} from "react-icons/io5";
import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useRemoveFolder } from "./useRemoveFolder";

type FolderMenuActionsProps = {
  _id: string;
  folderName: string;
};

function FolderMenuActions({
  _id,
  folderName
}: FolderMenuActionsProps): JSX.Element {

  const {removeFolder} = useRemoveFolder();

  function deleteFolder(){
    removeFolder(_id)
  }

  return (
    <Modal>
      <Menu>
        <Menu.Toggle id={_id}>
          <IoEllipsisHorizontal size={20} />
        </Menu.Toggle>
        <Menu.ListTabs>
          <Menu.Tab>
            <IoPlay /> Execute a test
          </Menu.Tab>
          <Menu.Tab>
            <IoPencil /> Rename
          </Menu.Tab>
          <Menu.Tab>
            <IoCodeDownload /> Import a file
          </Menu.Tab>
          <Modal.Toggle id={_id}>
            <Menu.Tab>
              <IoTrash /> Delete
            </Menu.Tab>
          </Modal.Toggle>
        </Menu.ListTabs>
      </Menu>
      <Modal.Body>
          <ConfirmDelete deleteItem={folderName} onConfirm={deleteFolder}/>
      </Modal.Body>
    </Modal>
  );
}


export default FolderMenuActions;
