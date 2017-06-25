import React, { Component } from 'react';
import $ from 'jquery';

export default class SocialShare extends Component {
  constructor(props) {
    super(props);
  }

  // React methods

  render() {
    return (
      <div className="social-sharing">
        <a
          href="https://twitter.com/intent/tweet?hashtags=reactriot&original_referer=https%3A//meaningoflife.herokuapp.com&ref_src=twsrc%5Etfw&related=twitterapi%2Ctwitter&text=Meaning of Life&tw_p=tweetbutton&url=https%3A//meaningoflife.herokuapp.com&via=mykhailodatsko"
          className="button"
          target="_blank"
        >
          <span className="icon-twitter"></span>
        </a>

        {/*<a
          href="javascript:void(0)"
          className="button"
        >
          <span className="icon-facebook"></span>
        </a>*/}

        {/*<iframe
          id="social-sharing-fb-iframe"
          src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fmeaningoflife.herokuapp.com%2Findex.html&layout=button&size=large&mobile_iframe=true&appId=143455512882934&width=115&height=28"
          width="30"
          height="30"
          scrolling="no"
          allowTransparency="true"
        >
        </iframe>*/}
      </div>
    )
  }
}
