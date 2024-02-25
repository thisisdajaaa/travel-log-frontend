import { useQuery } from "@tanstack/react-query";
import { getCountriesAPI } from "@/services/countries";

const useFetchCountries = () => {
  const response = useQuery({
    queryKey: ["countries"],
    queryFn: getCountriesAPI,
  });

  return response;
};

export default useFetchCountries;
