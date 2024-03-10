import { useContext } from "react";
import { ExplorerContext } from "./Explorer";

export function useRepositoryContext() {
  const context = useContext(ExplorerContext);
  if (!context)
    throw new Error("Explorer context was used outside of his scope");

  return context;
}
