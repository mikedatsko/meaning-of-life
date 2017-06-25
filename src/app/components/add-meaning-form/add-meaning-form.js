import React, { Component } from 'react';
import { Http, Store } from '../../services';

export default class AddMeaningForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meaning: '',
      isSending: false,
      isErrorEmpty: false,
      maxMeanings: 10
    };

    Store.subscribe('maxMeanings', maxMeanings => {
      console.log(maxMeanings);
      this.setState({maxMeanings: maxMeanings});
    });
  }

  // React methods

  render() {
    return (
      <form className="meaning-form" onSubmit={(e) => this.handleSubmit(e)}>
        <div
          className="preloader"
          hidden={!this.state.isSending}
        >
        </div>

        <span className="label">What is Your meaning of life?</span>
        <span className="meanings-limit" data-limit={this.state.maxMeanings}>
          You may leave <strong>{this.state.maxMeanings}</strong> meanings
        </span>

        <input
          type="text"
          placeholder={this.state.maxMeanings
            ? 'I think the meaning of life is ...' 
            : 'Your meanings are empty'
          }
          value={this.state.meaning}
          onChange={(e) => this.handleChange(e)}
          required={this.state.isErrorEmpty}
          disabled={this.state.isSending || !this.state.maxMeanings}
        />

        <button
          type="submit"
          className="button"
          disabled={this.state.isSending || !this.state.maxMeanings}
        >
          <span className="icon-plus-circle"></span>
        </button>
      </form>
    )
  }

  // Other methods

  handleChange(event) {
    this.setState({isErrorEmpty: false, meaning: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const meaning = this.state.meaning;

    if (!this.state.meaning) {
      this.setState({isErrorEmpty: true});

      setTimeout(() => {
        this.setState({isErrorEmpty: false});
      }, 1000);

      return
    }

    this.setState({meaning: '', isSending: true, isErrorEmpty: false});

    Http.createMeaning(meaning).then(response => {
      this.setState({isSending: false});

      console.log(response);

      if (response.status === 201) {
        Store.set('newMeaning', response.data.obj);
      }
    }, error => {
      console.warn(error);
    });
  }
}
