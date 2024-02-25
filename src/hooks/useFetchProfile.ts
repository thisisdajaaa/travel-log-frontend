import { userProfileAPI } from './../services/authentication';
import { useQuery } from "@tanstack/react-query";

const useFetchProfile = () => {
  const response = useQuery({
    queryKey: ["profiledata"],
    queryFn: userProfileAPI,
  });

  return response;
};

export default useFetchProfile;
