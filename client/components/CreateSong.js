import React, { Component } from "react";
import { Link, hashHistory } from "react-router";
import { graphql } from "react-apollo";
import createSongMutation from "../mutations/createSongMutation";
import fetchSongsQuery from "../queries/fetchSongsQuery";

class CreateSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  callCreateSong(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [{ query: fetchSongsQuery }]
      })
      .then(() => {
        this.setState({ title: "" });
        hashHistory.push("/");
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <Link to="/" className="btn-floating btn-large">
          all songs
        </Link>
        <h4>create song</h4>
        <form onSubmit={this.callCreateSong.bind(this)}>
          <input
            placeholder="enter title"
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

export default graphql(createSongMutation)(CreateSong);
