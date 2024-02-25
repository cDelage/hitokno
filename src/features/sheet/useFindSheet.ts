import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useFindSheet() {
  const [searchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");

  const { data: sheet, isLoading: isSheetLoading } = useQuery({
    queryKey: ["sheet", sheetId],
    queryFn: () => window.repository.findSheet(sheetId !== null ? sheetId : ""),
  });

  return { sheet, isSheetLoading };
}
