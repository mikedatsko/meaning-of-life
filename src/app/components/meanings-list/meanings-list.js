import React, { Component } from 'react';
import Meaning from '../meaning/meaning';
import { Http, Store } from '../../services';
import $ from 'jquery';

export default class MeaningsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meanings: [],
      filter: 'likes',
      isLoading: true
    };

    Store.set('filter', this.state.filter);

    Store.subscribe('newMeaning', newMeaning => {
      this.getMeanings(() => {
        const $meaningsEl = $('#meanings');
        const $meaningEl = $(`#row_${newMeaning._id}`);

        $meaningEl.addClass('blink');

        const scrollTop = $meaningsEl.scrollTop() + $meaningEl.position().top;

        $meaningsEl.animate({scrollTop: scrollTop + 'px'}, 1000, () => {
          setTimeout(() => {
            $meaningEl.removeClass('blink');
          }, 3000);
        });
      });
    })
  }

  // React methods

  render() {
    const meanings = this.state.meanings;
    const meaningsPrepared = meanings.map(meaning =>
      <Meaning
        key={meaning._id}
        meaning={meaning}
        handleLike={(id, like) => this.handleLike(id, like)}
      />
    );

    return (
      <div className="meanings" id="meanings">
        <div
          className="preloader"
          hidden={!this.state.isLoading}
        >
        </div>

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
        <table>
          <tbody>
            {meaningsPrepared}
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.getMeanings();
  }

  // Other methods

  handleLike(id, like) {
    Http.updateMeaning(id, like).then(meaningResponse => {
      const meanings = this.state.meanings.map(meaning => {
        if (meaning._id === meaningResponse._id) {
          meaning = Object.assign({}, meaningResponse);
        }

        return meaning;
      });

      this.setState({meanings: meanings});
    }, error => {
      console.warn(error);
    });
  }

  handleSubmit(response) {
    this.getMeanings();
  }

  handleFilter(filterValue) {
    this.setState({filter: filterValue});
    Store.set('filter', filterValue);
    this.getMeanings();
  }

  getMeanings(callback) {
    this.setState({isLoading: true});

    Http.getMeanings().then(meanings => {
      this.setState({meanings: meanings, isLoading: false});

      if (callback) {
        callback();
      }
    }, error => {
      console.warn(error);
    });
  }
}
