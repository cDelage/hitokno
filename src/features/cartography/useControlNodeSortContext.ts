import { useContext } from "react";
import { SortingContext } from "./NodeControlSortList";

function useControlNodeSortContext() {
    const context = useContext(SortingContext);
    if(!context) throw new Error("Contron node sort context was used outside of his scope");

    return context;
}

export default useControlNodeSortContext;