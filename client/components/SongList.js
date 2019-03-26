import React, { Component } from "react";
import { Link } from "react-router";
import { graphql } from "react-apollo";
import fetchSongsQuery from "../queries/fetchSongsQuery";
import deleteSongMutation from "../mutations/deleteSongMutation";
import DeleteSong from "./DeleteSong";

class SongList extends Component {
  renderSongs() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading...</div>;
    }

    return data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <DeleteSong id={id} />
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <Link to="/new" className="btn-floating btn-large">
          {" "}
          <i className="material-icons">add</i>
        </Link>
        <ul className="collection">{this.renderSongs()}</ul>
      </div>
    );
  }
}

export default graphql(fetchSongsQuery)(SongList);
