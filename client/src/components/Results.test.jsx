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
    const currentEntries = ["A", "B"];
    const tally = { "Shrek 2": 1, Inception: 5 };
    const next = jest.fn();
    const { getByText } = render(
      <Results currentEntries={currentEntries} tally={tally} next={next} />
    );

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

  it("displays input for setting entries", () => {
    const { queryByText } = render(<Results />);
    expect(queryByText(/entries/i)).toBeInTheDocument();
  });

  it("displays a button for calling the set entries function", () => {
    const { queryByText } = render(<Results />);
    expect(queryByText(/Set entries/i)).toBeInTheDocument();
  });

  it("button calls the function with the correct arguments", () => {
    const saveEntries = jest.fn();
    const { getByText, getByLabelText } = render(
      <Results saveEntries={saveEntries} />
    );
    const input = getByLabelText("New entries");
    fireEvent.change(input, {
      target: {
        value: "Simpsonit, Futurama"
      }
    });
    const button = getByText("Set entries");
    fireEvent.click(button);
    expect(saveEntries).toHaveBeenCalledTimes(1);
    expect(saveEntries).toHaveBeenCalledWith(["Simpsonit", "Futurama"]);
  });

  it("does not display current entries title when there is no entries", () => {
    const { queryByText } = render(<Results />);
    expect(queryByText(/next in voting/i)).not.toBeInTheDocument();
  });

  it("displays current entries list title", () => {
    const entries = ["Amis", "Lukio"];
    const { queryByText } = render(<Results currentEntries={entries} />);
    expect(queryByText(/next in voting/i)).toBeInTheDocument();
  });

  it("displays current entries array", () => {
    const entries = ["Amis", "Lukio"];
    const { queryByText } = render(<Results currentEntries={entries} />);
    expect(queryByText(entries[0])).toBeInTheDOM();
  });

  it("does not display voting in progress if its not true", () => {
    const { queryByText } = render(<Results />);
    expect(queryByText(/voting in progress/i)).not.toBeInTheDOM();
  });

  it("displays if vote is in progress", () => {
    const { getByText } = render(<Results voteStarted={true} />);
    getByText(/voting in progress/i);
  });

  it("disabled adding entries if vote is in progress", () => {
    const { getByText } = render(<Results voteStarted={true} />);

    const button = getByText(/set entries/i);
    expect(button.getAttribute("disabled")).toEqual("");
  });

  it("enables adding entries if vote is not in progress", () => {
    const { getByText } = render(<Results />);
    const button = getByText(/set entries/i);
    expect(button.getAttribute("disabled")).toEqual(null);
  });

  it("displays what we are voting for", () => {
    const pair = ["Amis", "Lukio"];
    const { queryByText } = render(<Results pair={pair} />);
    expect(queryByText(pair[0])).toBeInTheDOM();
    expect(queryByText(pair[1])).toBeInTheDOM();
  });

  it("changes the titles for voting items", () => {
    const pair = ["Saha", "Kirves"];
    const { queryByText } = render(<Results pair={pair} />);
    expect(queryByText(pair[0])).toBeInTheDOM();
    expect(queryByText(pair[1])).toBeInTheDOM();
  });

  it("does not display next button if there are no entries", () => {
    const { queryByText } = render(<Results />);
    expect(queryByText(/next/i)).not.toBeInTheDocument();
  });

  it("displays the enxt button if there are entries", () => {
    const entries = ["A", "B"];
    const { queryByText } = render(<Results currentEntries={entries} />);
    expect(queryByText(/next/i)).toBeInTheDocument();
  });

  it("has a reset button", () => {
    const { queryByText } = render(<Results />);
    expect(queryByText(/reset/i)).toBeInTheDocument();
  });

  it("calls the reset function when clicking the beset button", () => {
    const reset = jest.fn();
    const { getByText } = render(<Results reset={reset} />);
    const button = getByText(/reset/i);

    fireEvent.click(button);
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
