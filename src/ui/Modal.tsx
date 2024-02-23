import {
  MouseEvent,
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import IconButton from "./IconButton";
import { ChildrenProps } from "../types/ChildrenProps.type";

type ModalContextType = {
  openId: string | undefined;
  open: (id: string) => void;
  close: () => void;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(6px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-gray-50);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 16px;
  transition: all 0.5s;
  max-height: 100%;
`;

const ModalBody = styled.div`
  overflow: auto;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
`;

const ModalContext = createContext<null | ModalContextType>(null);

function Modal({ children }: ChildrenProps): JSX.Element {
  const [openId, setOpenId] = useState<string | undefined>(undefined);

  function open(id: string) {
    setOpenId(id);
  }

  function close() {
    setOpenId(undefined);
  }

  return (
    <ModalContext.Provider value={{ openId, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Toggle({ children, id }: ChildrenProps & { id: string }): JSX.Element {
  const { open } = useContext(ModalContext) as ModalContextType;

  return cloneElement(children as ReactElement, { onClick: () => open(id) });
}

function Body({
  children,
  isOpen,
}: ChildrenProps & { isOpen?: boolean }): JSX.Element | null {
  const { openId, close } = useContext(ModalContext) as ModalContextType;
  console.log("MODAL STATE : ", isOpen)
  if (!openId || !isOpen) return null;

  function handleClickOverlay(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return createPortal(
    <Overlay onClick={handleClickOverlay}>
      <ModalBody>
        <StyledModal>
          <CloseButton onClick={close}>
            <IconButton>
              <IoCloseOutline size={28} />
            </IconButton>
          </CloseButton>
          {cloneElement(children as ReactElement, { onCloseModal: close })}
        </StyledModal>
      </ModalBody>
    </Overlay>,
    document.body
  );
}

Modal.Toggle = Toggle;
Modal.Body = Body;

export default Modal;
