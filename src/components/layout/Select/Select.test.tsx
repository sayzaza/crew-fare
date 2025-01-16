import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Select from "./Select";
import { ISelectOption } from "../../../models/UI/ISelectOption";

describe("Select component", () => {
  const mockOnChange = jest.fn();
  const values: ISelectOption[] = [
    { value: "1", name: "Option 1" },
    { value: "2", name: "Option 2" },
    { value: "3", name: "Option 3" },
  ];

  it("should render selected value correctly", () => {
    render(
      <Select values={values} selectedValue="1" onChange={mockOnChange} />
    );

    // Check if selected value is rendered
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("should toggle dropdown when button is clicked", async () => {
    render(
      <Select values={values} selectedValue="1" onChange={mockOnChange} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button); // Opens dropdown

    // Check if Option 2 is rendered
    await waitFor(() => {
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  it("should call onChange with correct value when an option is selected", async () => {
    render(
      <Select values={values} selectedValue="1" onChange={mockOnChange} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button); // Open dropdown

    const option = screen.getByText("Option 2");
    fireEvent.click(option); // Select option

    // Ensure onChange is called with the correct value
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("2");
    });

    // Ensure dropdown closes after selection
    await waitFor(() => {
      expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    });
  });

  it("should close dropdown when clicking outside", async () => {
    render(
      <Select values={values} selectedValue="1" onChange={mockOnChange} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button); // Open dropdown

    // Click outside dropdown
    fireEvent.click(document.body);

    // Ensure dropdown is closed
    await waitFor(() => {
      expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    });
  });

  it("should apply invalid styles when isInvalid prop is true", () => {
    render(
      <Select
        values={values}
        selectedValue="1"
        onChange={mockOnChange}
        isInvlaid
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("select__dropdownBtn_invalid");
  });
});
