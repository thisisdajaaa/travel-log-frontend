import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  FC,
  Fragment,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import { noop } from "@/utils/helpers";
import logger from "@/utils/logger";
import {
  useAppDispatch,
  useAppSelector,
  useMount,
  useRouteTracking,
} from "@/hooks";
import { actions } from "@/redux/utils";

import { LayoutOptions } from "./config";
import type { LayoutProps } from "./types";
import Loading from "../Loading";
import Header from "../Header";

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  mode = LayoutOptions.Authenticated,
  children,
}) => {
  const { status, data: session } = useSession();
  const dispatch = useAppDispatch();

  const isRouteChange = useRouteTracking(noop, []);

  useEffect(() => {
    if (session?.user?.accessToken)
      dispatch(actions.callSetAccessToken(session?.user?.accessToken));
  }, [dispatch, session?.user?.accessToken]);

  const renderContent = useMemo(() => {
    if (!session && mode === LayoutOptions.NotAuthenticated)
      return (
        <div
          className="relative flex min-h-screen items-center justify-center py-12 px-4"
          data-testid="layout-unauthenticated"
        >
          {children}
        </div>
      );

    if (!session && status === "unauthenticated") return null;

    return (
      <div
        className="flex min-h-screen flex-col"
        data-testid="layout-authenticated"
      >
        <Header />

        <div className="flex flex-1 flex-col md:flex-row">
          <main
            className={clsx(
              "flex-1 overflow-x-auto transition-all duration-200 ease-in-out scrollbar-hide"
            )}
            data-testid="content"
          >
            {isRouteChange ? (
              <Loading height="h-[calc(100vh-108px)]" />
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    );
  }, [children, mode, session, status, isRouteChange]);

  return <Fragment>{renderContent}</Fragment>;
};

export default Layout;
