import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Submit from "./Submit";

describe("<Submit />", () => {
  test("Submit renders with the right value", () => {
    const name = "Log In";
    render(<Submit name={`${name}`} />);
    const submitElement = screen.getByTestId("submit");

    expect(submitElement).toBeInTheDocument();
    expect(submitElement.value).toBe(name); ///
  });
});
