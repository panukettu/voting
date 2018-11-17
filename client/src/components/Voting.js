import React from "react";
import v4 from "uuid/v4";
import { connect } from "react-redux";
import * as actionCreators from "../actionCreators";
import "./Voting.css";

const mapStateToProps = ({
  vote: { pair = [], tally = {} },
  winner,
  votedFor
}) => ({
  pair,
  tally,
  winner,
  votedFor
});

export function Voting({ winner, ...props }) {
  return (
    <div className="voting">
      {winner ? (
        <div className="winner">Winner is: {winner}</div>
      ) : (
        <Vote {...props} />
      )}
    </div>
  );
}

const Vote = ({ pair, tally = {}, votedFor, vote }) => {
  const hasVotedFor = entry => votedFor === entry;
  const isDisabled = !!votedFor;

  return (
    <div>
      {pair.map(entry => (
        <div key={v4()} className="voting-item">
          {hasVotedFor(entry) && (
            <label htmlFor="results" style={{ color: "white" }}>
              You and {tally[entry] - 1} others voted for
            </label>
          )}
          <button
            className="voting-button"
            name="entry"
            disabled={isDisabled}
            onClick={() => vote(entry)}
          >
            {entry}
          </button>
        </div>
      ))}
    </div>
  );
};

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
