import { TestStatusTheme } from "../../types/Test.type";

export const testStatusTheme : TestStatusTheme[] = [
    {
        status: "DRAFT",
        theme: "gray"
    },
    {
        status: "COMPLETE",
        theme: "positive"
    },
    {
        status: "IN PROGRESS",
        theme: "medium"
    }
]