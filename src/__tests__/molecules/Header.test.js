import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Header from "../../components/molecules/Header";
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

  test("Logout button should render if current page is servers list", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logout = screen.getByTestId("logout");

    expect(logout).toBeInTheDocument();
  });
});
