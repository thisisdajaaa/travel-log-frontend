import { useQuery } from "@tanstack/react-query";

import { getCountriesAPI } from "@/services/country";

const useFetchCountries = () => {
  const response = useQuery({
    queryKey: ["getCountries"],
    queryFn: getCountriesAPI,
  });

  return response;
};

export default useFetchCountries;
