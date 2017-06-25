import React, { Component } from 'react';
import { Http } from './services';
import MeaningsList from './components/meanings-list/meanings-list';
import AddMeaningForm from './components/add-meaning-form/add-meaning-form';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meanings: []
    };
  }

  // React methods

  render() {
    return (
      <div className="app">
        <a
          href="https://www.reactriot.com/team"
          target="_blank"
          className="logo-redsocks"
        >
          RED<span>SOCKS</span>
        </a>

        <a
          href="https://www.reactriot.com/team"
          target="_blank"
          className="logo"
        >
          <span className="logo-title">
            <span className="logo-image"></span>
            Meaning of life
          </span>
        </a>

        <AddMeaningForm />
        <MeaningsList />
      </div>
    )
  }
}
