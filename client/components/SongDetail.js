import React from "react";
import { Link } from "react-router";
import { graphql } from "react-apollo";
import fetchSongQuery from "../queries/fetchSongQuery";
import CreateLyric from "./CreateLyric";
import LyricList from "./LyricList";

const SongDetail = props => {
  if (props.data.loading) {
    return <div>Loading...</div>;
  }
  const { title } = props.data.song;
  return (
    <div>
      <Link to="/" className="btn-floating btn-large">
        all songs
      </Link>
      <h4>{title}</h4>
      <CreateLyric id={props.params.id} />
      <LyricList lyrics={props.data.song.lyrics} />
    </div>
  );
};

export default graphql(fetchSongQuery, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
