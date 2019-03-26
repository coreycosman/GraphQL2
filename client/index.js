import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import SongList from "./components/SongList";
import SongDetail from "./components/SongDetail";
import CreateSong from "./components/CreateSong";

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <div>
        <Route path="/" component={SongList} exact />
        <Route path="/songs/:id" component={SongDetail} exact />
        <Route path="/new" component={CreateSong} exact />
      </div>
    </Router>
  </ApolloProvider>,
  document.querySelector("#root")
);
