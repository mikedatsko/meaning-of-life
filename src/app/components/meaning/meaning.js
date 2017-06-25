import React, { Component } from 'react';

export default class Meaning extends Component {
  constructor(props) {
    super(props);
  }

  // React methods

  render() {
    const meaning = this.props.meaning;

    if (!meaning) {
      return (<tr></tr>)
    }

    return (
      <tr id={`row_${meaning._id}`}>
        <td>
          <button
            className="button"
            onClick={(e) => this.props.handleLike(meaning._id, false)}
          >
            <span className="icon-thumbs-down"></span>
            <span className="dislikes">{meaning.dislikes}</span>
          </button>
        </td>
        <td>{meaning.name}</td>
        <td>
          <button
            className="button"
            onClick={(e) => this.props.handleLike(meaning._id, true)}
          >
            <span className="icon-thumbs-up"></span>
            <span className="likes">{meaning.likes}</span>
          </button>
        </td>
      </tr>
    )
  }
}
