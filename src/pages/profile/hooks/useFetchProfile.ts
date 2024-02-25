import { useQuery } from "@tanstack/react-query";

import { getProfileAPI } from "@/services/profile";

const useFetchProfile = () => {
  const response = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfileAPI(),
  });

  return response;
};

export default useFetchProfile;
