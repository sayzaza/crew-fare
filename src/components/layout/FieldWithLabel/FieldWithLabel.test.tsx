import React from "react";
import { render, screen } from "@testing-library/react";
import FieldWithLabel from "./FieldWithLabel";

// Mock styles for testing
jest.mock("./FieldWithLabel.module.scss", () => ({
  fieldWithLabel: "fieldWithLabel",
  fieldWithLabel__text: "fieldWithLabel__text",
  fieldWithLabel__errorTxt: "fieldWithLabel__errorTxt",
  fieldWithLabel__errorTxt_show: "fieldWithLabel__errorTxt_show",
  fieldWithLabel__errorTxtWrapper: "fieldWithLabel__errorTxtWrapper",
}));

describe("FieldWithLabel Component", () => {
  it("renders the label and children correctly", () => {
    render(
      <FieldWithLabel label="Test Label">
        <input type="text" placeholder="Test Input" />
      </FieldWithLabel>
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test Input")).toBeInTheDocument();
  });

  it("renders as a div when asDiv is true", () => {
    render(
      <FieldWithLabel label="Test Label" asDiv>
        <input type="text" placeholder="Test Input" />
      </FieldWithLabel>
    );
    // Find the parent div by its class and verify it contains the label text
    /* eslint-disable testing-library/no-node-access */
    const parentElement = screen.getByText("Test Label").parentElement;
    expect(parentElement).toBeInTheDocument();
    expect(parentElement?.tagName.toLowerCase()).toBe("div");
    expect(parentElement).toHaveClass("fieldWithLabel");
  });

  it("renders as a label by default", () => {
    render(
      <FieldWithLabel label="Test Label">
        <input type="text" placeholder="Test Input" />
      </FieldWithLabel>
    );
    /* eslint-disable testing-library/no-node-access */
    const parentElement = screen.getByText("Test Label").parentElement;
    expect(parentElement).toBeInTheDocument();
    expect(parentElement?.tagName.toLowerCase()).toBe("label");
    expect(parentElement).toHaveClass("fieldWithLabel");
  });

  it("displays the error message when error is provided", () => {
    render(
      <FieldWithLabel label="Test Label" error="Error Message">
        <input type="text" placeholder="Test Input" />
      </FieldWithLabel>
    );
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });

  it("hides the error message when withoutError is true", () => {
    render(
      <FieldWithLabel label="Test Label" error="Error Message" withoutError>
        <input type="text" placeholder="Test Input" />
      </FieldWithLabel>
    );
    expect(screen.queryByText("Error Message")).not.toBeInTheDocument();
  });
	
  it("applies the custom className", () => {
    render(
      <FieldWithLabel label="Test Label" className="custom-class">
        <input type="text" placeholder="Test Input" />
      </FieldWithLabel>
    );
    /* eslint-disable testing-library/no-node-access */
    const labelElement = screen.getByText("Test Label").parentElement;
    expect(labelElement).toHaveClass("custom-class");
  });
});