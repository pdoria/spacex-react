import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';

import Launch from './components/Launch';
import Menu from './components/Menu';
import Home from './components/Home';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Menu />
          {/* This is the / so the following matches and renders the component! */}
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/launches" component={Launches} /> */}
          <Route exact path="/launch/:id" component={Launch} />
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;
