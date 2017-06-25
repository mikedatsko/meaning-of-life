import React, { Component } from 'react';
import Meaning from '../meaning/meaning';
import Filter from '../filter/filter';
import { Http, Store } from '../../services';
import $ from 'jquery';

export default class MeaningsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meanings: [],
      isLoading: true
    };
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

        <Filter />

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
    });

    Store.subscribe('filter', filter => {
      this.getMeanings();
    });
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
