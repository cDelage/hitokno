import {
  IoClose,
  IoEllipsisHorizontal,
  IoImageOutline,
  IoTrashOutline,
} from "react-icons/io5";
import Modal from "../../ui/Modal";
import Menu from "../../ui/Menu";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { FileShort } from "../../types/Repository.types";
import { BiPen } from "react-icons/bi";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDeleteFile from "./useDeleteFile";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateMiniature from "./useUpdateMiniature";
import useRemoveMiniature from "./useRemoveMiniature";

function FileMenuActions({ file }: { file: FileShort }) {
  const [, setSearchParams] = useSearchParams();
  const { deleteFile } = useDeleteFile();
  const navigate = useNavigate();
  const { updateMiniature } = useUpdateMiniature();
  const queryClient = useQueryClient();
  const { miniature, _id } = file;
  const { removeMiniature } = useRemoveMiniature();
  const handleRename = useCallback(() => {
    setSearchParams({
      mode: "EDIT",
    });
  }, [setSearchParams]);

  const handleDeleteFile = useCallback(() => {
    deleteFile(
      { _id },
      {
        onSuccess: () => {
          navigate(`/explorer`);
          queryClient.refetchQueries({
            queryKey: ["repository"],
          });
        },
      }
    );
  }, [deleteFile, navigate, queryClient, _id]);

  const handleUpdateMiniature = useCallback(() => {
    updateMiniature(_id);
  }, [updateMiniature, _id]);

  return (
    <Modal>
      <Menu>
        <Menu.Toggle id={file._id}>
          <IoEllipsisHorizontal size={20} />
        </Menu.Toggle>
        <Menu.ListTabs>
          <Menu.Tab onClick={handleRename}>
            <BiPen size={20} /> Rename file
          </Menu.Tab>
          <Modal.Toggle id={file._id}>
            <Menu.Tab>
              <IoTrashOutline size={20} />
              Delete file
            </Menu.Tab>
          </Modal.Toggle>
          <Menu.Tab onClick={handleUpdateMiniature}>
            <IoImageOutline size={20} />
            Modify miniature
          </Menu.Tab>
          {miniature && (
            <Menu.Tab onClick={() => removeMiniature(_id)}>
              <IoClose size={20} />
              Remove miniature
            </Menu.Tab>
          )}
        </Menu.ListTabs>
      </Menu>
      <Modal.Body>
        <ConfirmDelete
          deleteItem={file.fileName}
          onConfirm={handleDeleteFile}
        />
      </Modal.Body>
    </Modal>
  );
}

export default FileMenuActions;
