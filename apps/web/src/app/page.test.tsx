import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./page";

describe("Home page", () => {
  it("renders the main heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /Alisson Sabino/i })
    ).toBeInTheDocument();
  });
});
