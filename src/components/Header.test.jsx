import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the title and subtitle correctly", () => {
    const title = "Test Title";
    const subtitle = "Test Subtitle";
    render(<Header title={title} subtitle={subtitle} />);

    const headingElement = screen.getByRole("heading", { name: title });
    const subtitleElement = screen.getByText(subtitle);

    expect(headingElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });
});
