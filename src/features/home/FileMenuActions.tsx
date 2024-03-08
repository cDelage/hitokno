import { IoEllipsisHorizontal, IoTrashOutline } from "react-icons/io5";
import Modal from "../../ui/Modal";
import Menu from "../../ui/Menu";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { FileShort } from "../../types/Repository.types";
import { BiPen } from "react-icons/bi";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDeleteFile from "./useDeleteFile";
import { useQueryClient } from "@tanstack/react-query";

function FileMenuActions({ file }: { file: FileShort }) {
  const [, setSearchParams] = useSearchParams();
  const {deleteFile} = useDeleteFile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleRename = useCallback(() => {
    setSearchParams({
      mode: "EDIT",
    });
  }, [setSearchParams]);

  const handleDeleteFile = useCallback(() => {
    deleteFile({_id: file._id}, {
      onSuccess: () => {
        navigate(`/explorer`)
        queryClient.refetchQueries({
          queryKey: ["repository"]
        })
      }
    })
  },[deleteFile, navigate, queryClient, file._id])

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
        </Menu.ListTabs>
      </Menu>
      <Modal.Body>
        <ConfirmDelete deleteItem={file.fileName} onConfirm={handleDeleteFile} />
      </Modal.Body>
    </Modal>
  );
}

export default FileMenuActions;
