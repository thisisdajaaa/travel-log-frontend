import { render, screen } from "@testing-library/react";

import Icon from "../Icon";

describe("Icon", () => {
  it("renders the Icon component", () => {
    render(<Icon src="/svg/Chevron.svg" height={12} width={12} />);

    const chevron = screen.getByAltText("Chevron");

    expect(chevron).toBeInTheDocument();
  });
});
