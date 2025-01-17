import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DatesSelector from "./DatesSelector";

describe("DatesSelector Component", () => {
	const mockOnChangeStartDate = jest.fn();
	const mockOnChangeEndDate = jest.fn();

	const renderComponent = (props = {}) => {
		return render(
			<DatesSelector
				startDateValue=""
				endDateValue=""
				onChangeStartDate={mockOnChangeStartDate}
				onChangeEndDate={mockOnChangeEndDate}
				{...props}
			/>
		);
	};

	it("renders correctly with default props", () => {
		renderComponent();
		expect(screen.getByText("Select Dates")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeEnabled();
	});

	it("disables the button when `disabled` prop is true", () => {
		renderComponent({ disabled: true });
		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("opens the calendar modal when the button is clicked", () => {
		renderComponent();
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(screen.getByText("Select Start Date")).toBeInTheDocument();
	});
	it("renders the start and end dates when provided", () => {
		renderComponent({
			startDateValue: new Date("01/01/2023"),
			endDateValue: new Date("01/15/2023")
		});
		expect(screen.getByText("01/01/2023 - 01/15/2023")).toBeInTheDocument();
	});

	it("updates the end date when a new date is selected", () => {
		renderComponent();
		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Simulate selecting a date on the end date calendar
		const endDateTile = screen.getAllByText("15")[1]; // Adjust based on the rendered date
		fireEvent.click(endDateTile);

		expect(mockOnChangeEndDate).toHaveBeenCalledWith(expect.any(Date));
	});

	it("closes the calendar modal when clicking outside", async () => {
		renderComponent();
		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Simulate clicking outside the calendar
		fireEvent.click(document.body);
		await waitFor(() => {
			expect(screen.queryByText("Select Start Date")).not.toBeInTheDocument();
		});
	});

	it("applies invalid styles when `isInvalid` prop is true", () => {
		renderComponent({ isInvalid: true });
		/* eslint-disable testing-library/no-node-access */
		const container = screen.getByText("Select Dates").parentElement;
		expect(container).toHaveClass("datesSelector_invalid");
	});
});
