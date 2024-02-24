import { render, screen } from "@testing-library/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

import { LayoutOptions } from "../config";
import Layout from "../Layout";

jest.mock("next-auth/react");

describe("Layout Authenticated Mode", () => {
  beforeEach(() => {
    const mockSession: Session = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: {
        email: "test@test.com",
        accountNumber: 123,
        id: "testId",
      },
    };

    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: mockSession,
    });
  });

  it("renders the Layout component", async () => {
    render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    const testId = screen.getByTestId("layout-authenticated");

    expect(testId).toBeInTheDocument();
  });

  it("renders the Header component", () => {
    render(
      <Provider store={store}>
        <Layout>
          <div>sample</div>
        </Layout>
      </Provider>
    );

    const testId = screen.getByTestId("header");

    expect(testId).toBeInTheDocument();
  });

  it("renders the Sidebar component", () => {
    render(
      <Provider store={store}>
        <Layout>
          <div>sample</div>
        </Layout>
      </Provider>
    );

    const testId = screen.getByTestId("sidebar");

    expect(testId).toBeInTheDocument();
  });

  it("renders the Content component", () => {
    render(
      <Provider store={store}>
        <Layout>
          <div>sample</div>
        </Layout>
      </Provider>
    );

    const testId = screen.getByTestId("content");

    expect(testId).toBeInTheDocument();
  });
});

describe("Layout NotAuthenticated Mode", () => {
  it("renders the Layout component", () => {
    (useSession as jest.Mock).mockReturnValueOnce([null, "unauthenticated"]);

    render(
      <Provider store={store}>
        <Layout mode={LayoutOptions.NotAuthenticated}>
          <div>sample</div>
        </Layout>
      </Provider>
    );

    const testId = screen.getByTestId("layout-unauthenticated");

    expect(testId).toBeInTheDocument();
  });
});
