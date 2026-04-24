import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  beforeEach(() => {
    // Wrap HomePage in MemoryRouter because it may contain components that use router features
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  });

  it("renders the main headings", () => {
    expect(
      screen.getByRole("heading", { name: /what are git hooks/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /git hoks directory/i }),
    ).toBeInTheDocument();
  });

  it("renders the list of git hooks", () => {
    expect(screen.getByText("pre-commit")).toBeInTheDocument();
    expect(screen.getByText("post-merge")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThan(
      0,
    );
  });
});
