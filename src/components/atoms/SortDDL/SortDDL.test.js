import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import SortDDL from "./SortDDL";

describe("<SortDDL />", () => {
  test("SortDDL should render", () => {
    render(<SortDDL id="sort-ddl" />);
    const sortElement = screen.getByTestId("sort-ddl");

    expect(sortElement).toHaveTextContent("Locations Ascending");
    expect(sortElement).toHaveTextContent("Locations Descending");
    expect(sortElement).toHaveTextContent("Distance Ascending");
    expect(sortElement).toHaveTextContent("Distance Descending");
    expect(sortElement).toBeInTheDocument();
  });

  test("DDL value should change when user selects", () => {
    render(<SortDDL id="sort-ddl" />);
    const sortElement = screen.getByTestId("sort-ddl");

    expect(sortElement.value).toBe("");
    fireEvent.change(sortElement, { target: { value: "name-asc" } });
    expect(sortElement.value).toBe("name-asc");
    fireEvent.change(sortElement, { target: { value: "distance-desc" } });
    expect(sortElement.value).toBe("distance-desc");
  });
});
