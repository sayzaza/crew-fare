import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox component", () => {
  const mockOnChange = jest.fn();

  it("should render the checkbox with the provided value and children", () => {
    render(
      <Checkbox
        onChange={mockOnChange}
        value="test-value"
        name="test-name"
        checked={false}
      >
        Test Label
      </Checkbox>
    );

    // Check if the label text is rendered
    expect(screen.getByText("Test Label")).toBeInTheDocument();

    // Check if the checkbox is rendered with the correct value
    const checkboxInput = screen.getByRole("checkbox");
    expect(checkboxInput).toHaveAttribute("value", "test-value");

    // Check if the checkbox is unchecked initially
    expect(checkboxInput).not.toBeChecked();
  });

  it("should call the onChange handler when toggled", () => {
    render(
      <Checkbox
        onChange={mockOnChange}
        value="test-value"
        name="test-name"
        checked={false}
      >
        Test Label
      </Checkbox>
    );

    const checkboxInput = screen.getByRole("checkbox");

    // Simulate a change event (click on the checkbox)
    fireEvent.click(checkboxInput);

    // Check if the onChange function was called
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("should apply the checked state correctly", () => {
    render(
      <Checkbox
        onChange={mockOnChange}
        value="test-value"
        name="test-name"
        checked={true}
      >
        Test Label
      </Checkbox>
    );

    const checkboxInput = screen.getByRole("checkbox");

    // Check if the checkbox is checked initially
    expect(checkboxInput).toBeChecked();
  });
});
