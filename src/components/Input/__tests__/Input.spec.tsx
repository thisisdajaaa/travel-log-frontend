import { fireEvent, render, screen } from "@testing-library/react";

import Input from "../Input";

describe("Input", () => {
  it("renders the Input component", () => {
    render(
      <Input
        label="Account Number"
        id="account-number"
        name="account-number"
        type="text"
        required
        className="relative block w-full rounded-[0.938rem] border-transparent px-3 py-2 text-blackOut placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        placeholder="Account Number"
        data-testid="input"
      />
    );

    const inputValue = screen.getByTestId("input");
    const placeholder = screen.getByPlaceholderText("Account Number");

    fireEvent.change(inputValue, { target: { value: "example" } });

    expect(placeholder).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(inputValue).toBeRequired();
  });
});
