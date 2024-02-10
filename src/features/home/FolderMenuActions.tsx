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

type FolderMenuActionsProps = {
  _id: string;
};

function FolderMenuActions({
  _id,
}: FolderMenuActionsProps): JSX.Element {
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
          <ConfirmDelete/>
      </Modal.Body>
    </Modal>
  );
}


export default FolderMenuActions;
