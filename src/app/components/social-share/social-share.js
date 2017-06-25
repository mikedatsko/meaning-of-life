import React, { Component } from 'react';

export default class SocialShare extends Component {
  constructor(props) {
    super(props);
  }

  // React methods

  render() {
    return (
      <div>
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A//meaningoflife.herokuapp.com"
          className="button"
          target="_blank"
        >
          <span className="icon-facebook"></span>
        </a>

        <a
          href="https://twitter.com/intent/tweet?hashtags=reactriot&original_referer=https%3A//meaningoflife.herokuapp.com&ref_src=twsrc%5Etfw&related=twitterapi%2Ctwitter&text=Meaning of Life&tw_p=tweetbutton&url=https%3A//meaningoflife.herokuapp.com&via=mykhailodatsko"
          className="button"
          target="_blank"
        >
          <span className="icon-twitter"></span>
        </a>
      </div>
    )
  }
}
