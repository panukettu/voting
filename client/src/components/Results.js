import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actionCreators";

const mapStateToProps = ({
  vote: { tally, pair },
  winner,
  entries,
  voteStarted,
  reset
}) => ({
  tally,
  winner,
  currentEntries: entries,
  pair,
  voteStarted,
  reset
});

export const Results = ({
  tally = {},
  next,
  winner,
  saveEntries,
  currentEntries,
  voteStarted,
  pair,
  reset
}) => {
  const [entries, setEntries] = useState("");
  const handleSaveEntries = entries => {
    const list = entries.replace(" ", "").split(",");
    saveEntries(list);
  };
  return (
    <div className="results">
      {voteStarted && <h2>Voting in progress</h2>}
      {pair && pair.map(item => <div key={item}>{item}</div>)}
      {Object.keys(tally).map(key => (
        <div key={key} className="entry">
          <h1>{key}</h1>
          <div className="votes">{tally[key]}</div>
        </div>
      ))}
      <div className="management">
        {currentEntries && <button onClick={() => next()}>Next</button>}
      </div>
      <div className="entries">
        {currentEntries && (
          <div>
            <h2>Next in voting</h2>
            {currentEntries.map(entry => (
              <div key={entry}>{entry}</div>
            ))}
          </div>
        )}
        <label htmlFor="entries">New entries</label>
        <input
          id="entries"
          name="entries"
          value={entries}
          type="text"
          onChange={e => setEntries(e.target.value)}
        />
        <button
          type="button"
          onClick={() => handleSaveEntries(entries)}
          disabled={voteStarted}
        >
          Set entries
        </button>
      </div>
      {winner && <div className="winner">Winner is {winner}</div>}
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);
