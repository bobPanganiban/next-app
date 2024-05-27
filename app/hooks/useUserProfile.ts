import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserProfile = (email: string) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => await axios.get(`/api/user?email=${email}`),
  });
};

export { useUserProfile };
