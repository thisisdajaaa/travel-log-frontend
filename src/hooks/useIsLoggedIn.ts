import { selectors } from "@/redux/utils";

import useAppSelector from "./useAppSelector";

const useIsLoggedIn = (): boolean => {
  const accessToken = useAppSelector(selectors.accessToken);

  return accessToken ? true : false;
};

export default useIsLoggedIn;
