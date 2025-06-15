import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { dayTag } from "../_functions/dayTagFunction";

describe("dayTag", () => {
  it("return correct tag for 1 day", () => {
    const tag = dayTag(1);
    expect(tag).toBe("den");
  });

  it("return correct tag for <=4 day", () => {
    const tag = dayTag(4);
    expect(tag).toBe("dny");
  });

  it("return correct tag for >4 day", () => {
    const tag = dayTag(5);
    expect(tag).toBe("dní");
  });
});
