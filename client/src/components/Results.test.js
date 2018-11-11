import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Results } from "./Results";

describe("results", () => {
  it("displays tally for both entries", () => {
    const tally = { "Shrek 2": 1, Inception: 5 };
    const { queryByText } = render(<Results tally={tally} />);

    expect(queryByText("Shrek 2")).toBeInTheDocument();
    expect(queryByText("Inception")).toBeInTheDocument();
    expect(queryByText("1")).toBeInTheDocument();
    expect(queryByText("5")).toBeInTheDocument();
  });

  it("can move to next by clicking the button", () => {
    const tally = { "Shrek 2": 1, Inception: 5 };
    const next = jest.fn();
    const { getByText } = render(<Results tally={tally} next={next} />);

    const button = getByText("Next");
    fireEvent.click(button);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("displays winner", () => {
    const tally = { "Shrek 2": 1, Inception: 5 };
    const winner = "Inception";
    const { queryByText } = render(<Results tally={tally} winner={winner} />);

    expect(queryByText("Winner is Inception")).toBeInTheDocument();
  });
});
