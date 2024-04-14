import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useNavigateToCartography({ fileId }: { fileId: string | undefined }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const navigateToCartography = async () => {
      if(fileId){
        await queryClient.invalidateQueries({ queryKey: ["test"], exact: false });
        await queryClient.invalidateQueries({ queryKey: ["file"], exact: false });
        navigate(`/cartography/${fileId}`);
      }
  }

  return {navigateToCartography}
}
