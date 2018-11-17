import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actionCreators";
import "./Results.css";
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
    <React.Fragment>
      <div className="results">
        {voteStarted && <h2>Voting in progress</h2>}
        {pair && (
          <div className="results-pair">
            {pair.map(item => (
              <div className="results-pair_container" key={item}>
                <h3>{item}</h3>
                <span className="results-pair_result">{tally[item]}</span>
              </div>
            ))}
          </div>
        )}
        <div className="results-management">
          {currentEntries && (
            <button
              id="next"
              className="results-management_btn"
              onClick={() => next()}
            >
              Next
            </button>
          )}
          <div className="results-management_next">
            {currentEntries && (
              <React.Fragment>
                <h2>Next in voting</h2>
                <div className="results-management_next-list">
                  {currentEntries.map(entry => (
                    <div className="results-management_next-entry" key={entry}>
                      {entry}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <button
          id="reset"
          className="results-management_btn"
          onClick={() => reset()}
        >
          Reset
        </button>
        {winner && <div className="winner">Winner is {winner}</div>}
      </div>
      <div className="results-management_newEntries">
        <label htmlFor="entries">New entries</label>
        <input
          className="results-management_text"
          id="entries"
          name="entries"
          value={entries}
          type="text"
          placeholder="Pizza, Pasta.."
          onChange={e => setEntries(e.target.value)}
        />
        <button
          id="setEntries"
          className="results-management_btn"
          type="button"
          onClick={() => handleSaveEntries(entries)}
          disabled={voteStarted}
        >
          Set entries
        </button>
      </div>
    </React.Fragment>
  );
};

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);
