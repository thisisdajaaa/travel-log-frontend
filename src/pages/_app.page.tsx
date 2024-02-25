import { NextPage } from "next";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { NextSeo } from "next-seo";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@/styles/globals.css";

import { GeneratePageTitle } from "@/utils/helpers";

import { site } from "@/config";

import Layout from "@/components/Layout";
import { LayoutOptions } from "@/components/Layout/config";

import { persistor, store } from "@/redux/store";

import type { NextAppProps } from "@/types/client";

import AuthProvider from "@/providers/AuthProvider";
import QueryClientProvider from "@/providers/QueryClientProvider";

const MyApp: NextPage<NextAppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const pageTitle =
    router.pathname !== "/500" &&
    router.pathname !== "/404" &&
    router.pathname !== "/"
      ? GeneratePageTitle(router.pathname)
      : router.pathname === "/"
      ? "Dashboard"
      : site.title;

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={site.description}
        canonical={site.siteUrl}
        titleTemplate={`${site.title} ${
          pageTitle !== site.title ? "| %s" : ""
        }`}
      />

      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider>
              <AuthProvider>
                <Toaster />

                {Component.requireAuth ? (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                ) : (
                  <Layout mode={LayoutOptions.NotAuthenticated}>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </AuthProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
