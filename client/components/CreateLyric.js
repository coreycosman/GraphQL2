import React, { Component } from "react";
import { Link, hashHistory } from "react-router";
import { graphql } from "react-apollo";
import addLyricToSongMutation from "../mutations/addLyricToSongMutation";
import fetchSongQuery from "../queries/fetchSongQuery";

class CreateLyric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  callCreateLyric(id, e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          songId: id,
          content: this.state.content
        }
      })
      .catch(e => console.log(e));
    this.setState({ content: "" });
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <h4>create lyric</h4>
        <form onSubmit={this.callCreateLyric.bind(this, id)}>
          <input
            placeholder="enter lyric content"
            onChange={e => this.setState({ content: e.target.value })}
            value={this.state.content}
          />
        </form>
      </div>
    );
  }
}

export default graphql(addLyricToSongMutation)(CreateLyric);

// without caching

// export default graphql(addLyricToSongMutation)(
//   graphql(fetchSongQuery, {
//     options: props => {
//       return { variables: { id: props.id } };
//     }
//   })(CreateLyric)
// );
