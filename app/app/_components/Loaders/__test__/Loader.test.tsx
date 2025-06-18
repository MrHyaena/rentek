import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import Loader from "../_components/Loader";

describe("ProductHorizontal", () => {
  //Context data
  const shown = true;
  const text = "This is loader";

  render(<Loader shown={shown} text={text} />);

  it("Renders correctly when shown with right text", () => {
    const paragraphElement = screen.getByTestId("loaderText");
    expect(paragraphElement).toHaveTextContent("This is loader");
  });
});
