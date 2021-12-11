import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Server from "../../components/atoms/Server";

describe("<Server />", () => {
  test("Server item should render", () => {
    const server = { name: "Germany #22", distance: 2 };
    render(<Server server={server} />);
    const serverItem = screen.getByTestId("server-item");

    expect(serverItem).toHaveTextContent("Germany #22");
    expect(serverItem).toHaveTextContent("2km");
  });
});
