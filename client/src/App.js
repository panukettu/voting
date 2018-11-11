import React, { Component } from "react";
import "./App.css";
import { VotingContainer } from "./components/Voting";
import { ResultsContainer } from "./components/Results";
import { Router } from "@reach/router";

class App extends Component {
  render() {
    return (
      <Router>
        <VotingContainer path="/" store={this.props.store} />
        <ResultsContainer path="results" />
      </Router>
    );
  }
}

export default App;
