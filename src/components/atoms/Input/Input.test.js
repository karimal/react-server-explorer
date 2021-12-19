import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("<Input />", () => {
  test("Text input should render", () => {
    const id = "test-input";
    render(<Input id={`${id}`} type="text" />);
    const inputElement = screen.getByTestId(`${id}`);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  test("Password input should render", () => {
    const id = "test-input";
    render(<Input id={`${id}`} type="password" />);
    const inputElement = screen.getByTestId(`${id}`);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("Input value updated when user writes something in the input", () => {
    const id = "test-input";
    render(<Input id={`${id}`} type="text" label="A Label" />);
    const inputElement = screen.getByTestId(`${id}`);

    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: "Some text" } });
    expect(inputElement.value).toBe("Some text");
  });
});
