import { fireEvent, render, screen } from "@testing-library/react";

import Button from "../Button";

describe("Button", () => {
  it("renders the Button component", () => {
    render(<Button>Click me</Button>);

    const heading = screen.getByText(/Click me/i);

    expect(heading).toBeInTheDocument();
  });

  it("check if Button is disabled", () => {
    render(<Button disabled>Click me</Button>);

    const button = screen.getByText(/Click me/i);

    expect(button).toBeDisabled();
  });

  it("check if Button is loading", () => {
    render(<Button isLoading>Click me</Button>);

    const loading = screen.getByTestId("loading-icon");

    expect(loading).toBeInTheDocument();
  });

  it("should trigger the Button onClick", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText(/Click me/i);

    fireEvent.click(button);

    expect(handleClick).toBeCalledTimes(1);
  });
});
