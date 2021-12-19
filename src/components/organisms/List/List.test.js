import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";

import List from "./List";
import data from "../../../data/list";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("<List />", () => {
  const server = setupServer(
    rest.get("https://playground.nordsec.com/v1/servers", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data));
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

  test("List page should render correctly", async () => {
    sessionStorage.setItem("__tok", "1111-2222-3333");

    render(<List />);

    await waitFor(
      () => {
        const serversList = screen.getAllByTestId("server-item");
        expect(serversList.length).toEqual(data.length);
      },
      { timeout: 2000 }
    );
  });

  test("If list page didn't render correctly, show the user a feedback", async () => {
    sessionStorage.setItem("__tok", "1111-2222-3333");

    server.use(
      rest.get("https://playground.nordsec.com/v1/servers", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: "A really bad thing just happened" })
        );
      })
    );

    render(<List />);

    await waitFor(
      () => {
        const warningElement = screen.getByTestId("warning");
        expect(warningElement).toBeInTheDocument();
        expect(warningElement).toHaveTextContent("Something wrong happened!");
      },
      { timeout: 2000 }
    );
  });

  test("Sorting is rendering the right information", async () => {
    sessionStorage.setItem("__tok", "1111-2222-3333");

    render(<List />);

    await waitFor(
      () => {
        const sortElement = screen.getByTestId("sort-ddl");
        fireEvent.change(sortElement, { target: { value: "name-asc" } });

        const serversList = screen.getAllByTestId("server-item");

        expect(serversList[0]).toHaveTextContent("Germany #54");
        expect(serversList[1]).toHaveTextContent("Japan #91");
        expect(serversList[2]).toHaveTextContent("Latvia #62");
        expect(serversList[3]).toHaveTextContent("United Kingdom #4");
        expect(serversList[4]).toHaveTextContent("United Kingdom #56");
        expect(serversList[5]).toHaveTextContent("United States #88");
      },
      { timeout: 2000 }
    );
  });
});
