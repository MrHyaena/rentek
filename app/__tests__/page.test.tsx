import { expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import Hero from "@/app/_components/PageComponents/Hero";

it("Page", () => {
  render(<Hero />);
  const headingOne = screen.getByText(/Půjčovna zahradní techniky/);
  expect(headingOne).toBeDefined();
});
