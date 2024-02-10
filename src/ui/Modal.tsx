import {
  MouseEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import IconButton from "./IconButton";

type ModalContextType = {
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
};

type ModalProps = {
  children: ReactNode;
};

type ToggleProps = {
  children: ReactNode;
  id: string;
};

type BodyProps = {
  children: ReactNode;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-gray-50);
  border-radius: 4px;
  box-shadow: var(--shadow-md);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-height: 100%;
`;

const ModalBody = styled.div`
  overflow: auto;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: transparent;
`;

const ModalContext = createContext<null | ModalContextType>(null);

function Modal({ children }: ModalProps): JSX.Element {
  const [openId, setOpenId] = useState<string | null>(null);

  function open(id: string) {
    setOpenId(id);
  }

  function close() {
    console.log("close");
    setOpenId(null);
  }

  return (
    <ModalContext.Provider value={{ openId, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Toggle({ children, id }: ToggleProps): JSX.Element {
  const { open } = useContext(ModalContext) as ModalContextType;

  return cloneElement(children as ReactElement, { onClick: () => open(id) });
}

function Body({ children }: BodyProps): JSX.Element | null {
  const { openId, close } = useContext(ModalContext) as ModalContextType;
  if (!openId) return null;

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
