import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainInput from "./MainInput";

describe("MainInput Component", () => {
  it("renders correctly with default placeholder", () => {
    render(<MainInput />);
    const input = screen.getByPlaceholderText("Type here");
    expect(input).toBeInTheDocument();
  });

  it("renders correctly with custom placeholder", () => {
    render(<MainInput placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText("Enter your name");
    expect(input).toBeInTheDocument();
  });

  it("renders number step buttons and handles stepUp/stepDown actions", () => {
    const handleChange = jest.fn();
    render(
      <MainInput
        type="number"
        showNumberStepBtns
        defaultValue={5}
        onChange={handleChange}
      />
    );

    // Check the rendered buttons
    const stepUpButton = screen.getByAltText("arrow top");
    const stepDownButton = screen.getByAltText("arrow down");
    const input = screen.getByRole("spinbutton");

    expect(stepUpButton).toBeInTheDocument();
    expect(stepDownButton).toBeInTheDocument();

    // Simulate stepUp action
    fireEvent.click(stepUpButton);
    expect(input).toHaveValue(6);

    // Simulate stepDown action
    fireEvent.click(stepDownButton);
    expect(input).toHaveValue(5);

    fireEvent.click(stepUpButton);
    expect(input).toHaveValue(6);

    fireEvent.click(stepDownButton);
    expect(input).toHaveValue(5);
    // Check if onChange is called
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it("renders with invalid state", () => {
    render(<MainInput isInvalid />);
    const input = screen.getByPlaceholderText("Type here");
    expect(input).toHaveClass("mainInput__field_invalid");
  });

  it("applies custom className", () => {
    render(<MainInput className="custom-class" />);
    const input = screen.getByPlaceholderText("Type here");
    expect(input).toHaveClass("custom-class");
  });

  it("handles custom attributes", () => {
    render(<MainInput data-testid="main-input" aria-label="Custom Input" />);
    const input = screen.getByTestId("main-input");
    expect(input).toHaveAttribute("aria-label", "Custom Input");
  });

  it("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    render(<MainInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Type here");

    fireEvent.change(input, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe("Hello");
  });

  it("does not render step buttons if `showNumberStepBtns` is false", () => {
    render(<MainInput type="number" showNumberStepBtns={false} />);
    const stepUpButton = screen.queryByAltText("arrow top");
    const stepDownButton = screen.queryByAltText("arrow down");

    expect(stepUpButton).not.toBeInTheDocument();
    expect(stepDownButton).not.toBeInTheDocument();
  });
});
