import React, { Component } from "react";
import { VotingContainer } from "./components/Voting";
import { ResultsContainer } from "./components/Results";
import { Router } from "@reach/router";

class App extends Component {
  render() {
    return (
      <Router>
        <VotingContainer path="/" />
        <ResultsContainer path="results" />
      </Router>
    );
  }
}

export default App;
