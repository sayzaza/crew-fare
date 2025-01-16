import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainBtn from "./MainBtn";

describe("MainBtn Component", () => {
  it("renders correctly with children text", () => {
    // Render the component
    render(<MainBtn>Submit</MainBtn>);

    // Check if the button with the expected accessible name is in the document
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });

  it("renders correctly with aria-label", () => {
    // Render the component with an aria-label
    render(<MainBtn aria-label="Submit">Click Me</MainBtn>);

    // Check if the button can be accessed using aria-label
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });

  it("fires click event correctly", () => {
    // Mock a click handler
    const handleClick = jest.fn();

    // Render the component
    render(<MainBtn onClick={handleClick}>Click Me</MainBtn>);

    // Get the button
    const button = screen.getByRole("button", { name: "Click Me" });

    // Simulate a click
    fireEvent.click(button);

    // Assert that the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom class names", () => {
    // Render the component with a custom className
    render(<MainBtn className="custom-class">Submit</MainBtn>);

    // Get the button
    const button = screen.getByRole("button", { name: "Submit" });

    // Assert that the button has the custom class name
    expect(button).toHaveClass("custom-class");
  });

  it("applies all passed attributes", () => {
    // Render the component with additional attributes
    render(
      <MainBtn data-testid="main-btn" disabled>
        Submit
      </MainBtn>
    );

    // Get the button
    const button = screen.getByTestId("main-btn");

    expect(button).toBeDisabled();
  });
});
