import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";

import Login from "./Login";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("<Login />", () => {
  const server = setupServer(
    rest.post("https://playground.nordsec.com/v1/tokens", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ token: "111111-222222-333333" }));
    })
  );

  beforeAll(() => {
    sessionStorage.clear();
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => {
    sessionStorage.clear();
    server.close();
  });

  test("Login should render correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginElement = screen.getByTestId("login");
    const usernameElm = screen.getByTestId("username");
    const passwordElm = screen.getByTestId("password");
    const submitElm = screen.getByTestId("submit");

    expect(loginElement).toBeInTheDocument();
    expect(usernameElm).toBeInTheDocument();
    expect(passwordElm).toBeInTheDocument();
    expect(submitElm).toBeInTheDocument();
  });

  test("Test if user can login and redirected to the Servers page", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const usernameElm = screen.getByTestId("username");
    const passwordElm = screen.getByTestId("password");
    const submitElm = screen.getByTestId("submit");

    userEvent.type(usernameElm, "an amazing username");
    userEvent.type(passwordElm, "proper password");

    userEvent.click(submitElm);

    expect(submitElm.value).toEqual("loading..");
    expect(submitElm).toHaveAttribute("disabled");

    await waitFor(() => {
      expect(window.sessionStorage.getItem("__tok")).toEqual(
        "111111-222222-333333"
      );
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("Test if the user is logged in and redirected automatically", async () => {
    window.sessionStorage.setItem("__tok", "111111-222222-333333");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  test("Test if API call didn't succeed, user gets feedback", async () => {
    server.use(
      rest.post("https://playground.nordsec.com/v1/tokens", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Unauthorized" }));
      })
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameElm = screen.getByTestId("username");
    const passwordElm = screen.getByTestId("password");
    const submitElm = screen.getByTestId("submit");
    const warning = screen.getByTestId("warning");

    userEvent.type(usernameElm, "an amazing username");
    userEvent.type(passwordElm, "proper password");

    userEvent.click(submitElm);

    expect(submitElm.value).toEqual("loading..");
    expect(submitElm).toHaveAttribute("disabled");

    await waitFor(() => {
      expect(warning).toBeInTheDocument();
      expect(warning).toBeVisible();
      expect(warning).toHaveTextContent("Something wrong happened!");
    });
  });
});
