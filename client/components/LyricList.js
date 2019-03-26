import React, { Component } from "react";
import { graphql } from "react-apollo";
import likeLyricMutation from "../mutations/likeLyricMutation";

class LyricList extends Component {
  likeLyric(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: ++likes
        }
      }
    });
  }

  renderLikeCount(likes) {
    if (likes === 0) {
      return <div />;
    }
    return <div>{likes}</div>;
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div>
            <button
              className="material-icons"
              onClick={() => this.likeLyric(id, likes)}
            >
              thumb_up
            </button>
            {this.renderLikeCount(likes)}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        Lyrics:
        <ul className="collection">{this.renderLyrics()}</ul>
      </div>
    );
  }
}

export default graphql(likeLyricMutation)(LyricList);
