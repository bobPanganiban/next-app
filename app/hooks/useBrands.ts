import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await axios.get("/api/brands");
    },
  });
};

export { useBrands };
