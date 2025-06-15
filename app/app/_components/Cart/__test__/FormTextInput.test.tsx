import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { FormTextInput } from "../_components/FormTextInput";

describe("FormTextInput", () => {
  render(<FormTextInput text="labelText" name="inputName" />);

  it("Renders correct label", () => {
    const labelElement = screen.getByText("labelText");
    expect(labelElement).toHaveTextContent("labelText");
  });

  it("Renders correct input name", () => {
    const inputElement = screen.getByTestId("inputElement");
    const inputName = inputElement.getAttribute("name");
    expect(inputName).toBe("inputName");
  });
});
