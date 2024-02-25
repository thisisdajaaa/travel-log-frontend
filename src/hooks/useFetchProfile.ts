import { userProfileAPI } from './../services/authentication';
import { useQuery } from "@tanstack/react-query";

const useFetchProfile = () => {
  const response = useQuery({
    queryKey: ["profile"],
   // queryFn: userProfileAPI,
  });

  return response;
};

export default useFetchProfile;
