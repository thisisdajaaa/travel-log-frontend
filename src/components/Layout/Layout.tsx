import clsx from "clsx";
import { useSession } from "next-auth/react";
import { FC, Fragment, PropsWithChildren, useEffect, useMemo } from "react";
import { batch } from "react-redux";

import { noop } from "@/utils/helpers";
import { useAppDispatch, useRouteTracking } from "@/hooks";

import { actions } from "@/redux/utils";

import { LayoutOptions } from "./config";
import type { LayoutProps } from "./types";
import Header from "../Header";
import Loading from "../Loading";
import Sidebar from "../Sidebar";

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  mode = LayoutOptions.Authenticated,
  children,
}) => {
  const { status, data: session } = useSession();
  const dispatch = useAppDispatch();

  const isRouteChange = useRouteTracking(noop, []);

  useEffect(() => {
    if (session?.user?.accessToken && session?.user?.refreshToken) {
      batch(() => {
        dispatch(actions.callSetAccessToken(session?.user?.accessToken || ""));
        dispatch(
          actions.callSetRefreshToken(session?.user?.refreshToken || "")
        );
      });
    }
  }, [dispatch, session?.user?.accessToken, session?.user?.refreshToken]);

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

        <div className="drawer lg:drawer-open">
          <input type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
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
          <Sidebar />
        </div>
      </div>
    );
  }, [children, mode, session, status, isRouteChange]);

  return <Fragment>{renderContent}</Fragment>;
};

export default Layout;
