import React, { Component } from 'react';
import { Store } from '../../services';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'likes'
    };
  }

  // React methods

  render() {
    return (
      <div className="filter">
        <button
          type="button"
          title="Most liked"
          onClick={(e) => this.handleFilter('likes')}
        >
          <span
            className={this.state.filter === 'likes' ? 'icon-check-circle' : 'icon-circle'}
          >
          </span>
        </button>

        <button
          type="button"
          title="Most disliked"
          onClick={(e) => this.handleFilter('dislikes')}
        >
          <span
            className={this.state.filter === 'dislikes' ? 'icon-check-circle' : 'icon-circle'}
          >
          </span>
        </button>

        <button
          type="button"
          title="Most controversial"
          onClick={(e) => this.handleFilter('contr')}
        >
          <span
            className={this.state.filter === 'contr' ? 'icon-check-circle' : 'icon-circle'}
          >
          </span>
        </button>
      </div>
    )
  }

  componentDidMount() {
    Store.set('filter', this.state.filter);
  }

  // Other methods

  handleFilter(filterValue) {
    this.setState({filter: filterValue});
    Store.set('filter', filterValue);
  }
}
