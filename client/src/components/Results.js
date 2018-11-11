import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actionCreators";

const mapStateToProps = ({ vote: { tally }, winner }) => ({
  tally,
  winner
});

export const Results = ({ tally = {}, next, winner }) =>
  winner ? (
    <div className="winner">Winner is {winner}</div>
  ) : (
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
    </div>
  );

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);
