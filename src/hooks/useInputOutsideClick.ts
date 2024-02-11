import { useEffect, useRef, MutableRefObject } from "react";

type OutsideClickHandler = () => void;

export function useInputOutsideClick(
  handler: OutsideClickHandler,
  listenCapturing = true
): MutableRefObject< HTMLInputElement | null> {
  const ref = useRef< HTMLInputElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}