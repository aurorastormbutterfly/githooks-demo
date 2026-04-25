import { render, screen, fireEvent } from "@testing-library/react";
import QuizPage from "./QuizPage";

describe("QuizPage", () => {
  it("renders the first question and progress", () => {
    render(<QuizPage />);
    expect(screen.getByText(/Where are Git hooks stored/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 1 \/ 5/i)).toBeInTheDocument();
  });

  it("toggles the hint visibility when the lightbulb icon is clicked", () => {
    render(<QuizPage />);
    const hintButton = screen.getByTitle("Show Hint");

    // Hint should initially be hidden
    expect(
      screen.queryByText(/Check the hidden directory/i),
    ).not.toBeInTheDocument();

    // Show hint
    fireEvent.click(hintButton);
    expect(screen.getByText(/Check the hidden directory/i)).toBeInTheDocument();

    // Hide hint
    fireEvent.click(hintButton);
    expect(
      screen.queryByText(/Check the hidden directory/i),
    ).not.toBeInTheDocument();
  });

  it("allows the user to select an option, confirm, and see the rationale", () => {
    render(<QuizPage />);
    const confirmButton = screen.getByRole("button", {
      name: /Confirm Answer/i,
    });

    expect(confirmButton).toBeDisabled();

    const correctOption = screen.getByText(/Inside the \.git\/hooks folder/i);
    fireEvent.click(correctOption);

    expect(confirmButton).not.toBeDisabled();

    fireEvent.click(confirmButton);

    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Next Question/i }),
    ).toBeInTheDocument();
  });
});
