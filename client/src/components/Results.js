import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actionCreators";

const mapStateToProps = ({ vote: { tally }, winner }) => ({
  tally,
  winner
});

export const Results = ({ tally = {}, next, winner, saveEntries }) => {
  const [entries, setEntries] = useState("");
  const handleSaveEntries = entries => {
    const list = entries.replace(" ", "").split(",");
    saveEntries(list);
  };
  return (
    <div className="results">
      {Object.keys(tally).map(key => (
        <div key={key} className="entry">
          <h1>{key}</h1>
          <div className="votes">{tally[key]}</div>
        </div>
      ))}
      <div className="management">
        <button onClick={() => next()}>Next</button>
      </div>
      <div className="entries">
        <label htmlFor="entries">New entries</label>
        <input
          id="entries"
          name="entries"
          value={entries}
          type="text"
          onChange={e => setEntries(e.target.value)}
        />
        <button type="button" onClick={() => handleSaveEntries(entries)}>
          Set entries
        </button>
      </div>
      {winner && <div className="winner">Winner is {winner}</div>}
    </div>
  );
};

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);
