import { render, screen } from "@testing-library/react";

import Typography from "../Typography";

describe("Typography", () => {
  it("renders the Typography component using a predefined preset", () => {
    render(<Typography preset="subheading">Test Text</Typography>);

    const text = screen.getByText(/Test Text/i);

    expect(text).toBeInTheDocument();
  });

  it("renders the Typography component using a custom preset", () => {
    render(
      <Typography
        color="text-improbable"
        variant="h4"
        size="text-base"
        className="font-bold"
      >
        Test Text
      </Typography>
    );

    const text = screen.getByText(/Test Text/i);

    expect(text).toBeInTheDocument();
  });
});
