import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Voting } from "./Voting";

describe("Voting", () => {
  it("displays pair", () => {
    const pair = ["Shrek", "Harry Potter"];
    const { getByText } = render(<Voting pair={pair} />);
    expect(getByText(pair[0])).toBeInTheDocument();
    expect(getByText(pair[1])).toBeInTheDocument();
  });

  it("votes when clicked", () => {
    const pair = ["Shrek", "Harry Potter"];
    const vote = jest.fn(entry => entry);
    const { getByText } = render(<Voting pair={pair} vote={vote} />);
    fireEvent.click(getByText("Shrek"));
    expect(vote).toHaveBeenCalledTimes(1);
    expect(vote).toHaveBeenCalledWith("Shrek");
  });

  it("does not allow voting again", () => {
    const pair = ["Shrek", "Harry Potter"];
    const vote = jest.fn(entry => entry);
    const { getByText } = render(
      <Voting pair={pair} vote={vote} votedFor="Shrek" />
    );
    fireEvent.click(getByText("Shrek"));
    expect(vote).not.toBeCalled();
  });

  it("adds label to voted entry", () => {
    const pair = ["Shrek", "Harry Potter"];
    const vote = jest.fn(entry => entry);
    const tally = { Shrek: 1 };
    const { queryByText, debug } = render(
      <Voting pair={pair} vote={vote} votedFor="Shrek" tally={tally} />
    );
    expect(queryByText("You and 0 others voted")).toBeInTheDocument();
  });

  it("renders just the winner", () => {
    const pair = ["Shrek", "Harry Potter"];
    const vote = jest.fn(entry => entry);

    const { getByText, queryByText } = render(
      <Voting pair={pair} vote={vote} votedFor="Shrek" winner="Shrek" />
    );

    expect(queryByText("Harry Potter")).not.toBeInTheDocument();
    expect(getByText("Winner is Shrek")).toBeInTheDocument();
  });
});
