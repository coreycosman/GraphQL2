import React, { Component } from "react";
import { Link } from "react-router";
import { graphql } from "react-apollo";
import fetchSongsQuery from "../queries/fetchSongsQuery";
import deleteSongMutation from "../mutations/deleteSongMutation";

class DeleteSong extends Component {
  callDeleteSong(id, e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: { id },
        refetchQueries: [{ query: fetchSongsQuery }]
      })
      .catch(e => console.log(e));
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <i
          className="material-icons"
          onClick={this.callDeleteSong.bind(this, id)}
        >
          {" "}
          delete
        </i>
      </div>
    );
  }
}

export default graphql(deleteSongMutation)(DeleteSong);
