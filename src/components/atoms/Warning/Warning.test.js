import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Warning from "./Warning";

describe("<Warning />", () => {
  test("Warning renders with the right value", () => {
    const message = "Warning message!";
    render(<Warning message={`${message}`} />);
    const warningElement = screen.getByTestId("warning");

    expect(warningElement).toBeInTheDocument();
    expect(warningElement).toHaveTextContent(message);
    expect(warningElement).toBeVisible();
  });
});
