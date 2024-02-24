import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";
import * as React from "react";
import { Provider } from "react-redux";

import Layout from "@/components/Layout";

import { store } from "@/redux/store";

import { LayoutOptions } from "../config";

export default {
  title: "Components/Layout",
  component: Layout,
  argTypes: {},
} as ComponentMeta<typeof Layout>;

const Authenticated: ComponentStory<typeof Layout> = () => (
  <SessionProvider
    session={{
      user: {
        email: "dummy@user.com",
        id: "TestId",
        accountNumber: 1234,
      },
      expires: "1",
    }}>
    <Provider store={store}>
      <Layout>
        <div>sample</div>
      </Layout>
    </Provider>
  </SessionProvider>
);

const NotAuthenticated: ComponentStory<typeof Layout> = () => (
  <SessionProvider session={null}>
    <Provider store={store}>
      <Layout mode={LayoutOptions.NotAuthenticated}>
        <div>sample</div>
      </Layout>
    </Provider>
  </SessionProvider>
);

export const LayoutAuthenticated = Authenticated.bind({});
LayoutAuthenticated.args = {};

export const LayoutUnauthenticated = NotAuthenticated.bind({});
LayoutUnauthenticated.args = {};
