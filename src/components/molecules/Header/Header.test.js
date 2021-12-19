import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router";

describe("<Header />", () => {
  test("Header should render correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const headerElement = screen.getByTestId("header");

    expect(headerElement).toBeInTheDocument();
  });

  test("Logout button should render if user is logged in", () => {
    sessionStorage.setItem("__tok", "1111-2222-3333");

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logout = screen.getByTestId("logout");

    expect(logout).toBeInTheDocument();
  });
});
