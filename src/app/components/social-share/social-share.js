import React, { Component } from 'react';

export default class SocialShare extends Component {
  constructor(props) {
    super(props);
  }

  // React methods

  render() {
    return (
      <div>
        <iframe
          src="https://platform.twitter.com/widgets/tweet_button.html?size=l&url=https://meaningoflife.herokuapp.com&via=mykhailo.datsko&related=twitterapi%2Ctwitter&text=Meaning of Life for ReactRiot Hackaton&hashtags=reactriot"
          width="140"
          height="28"
          title="Twitter Tweet Button"
          className="social-share-twitter"
        >
        </iframe>

        <iframe
          src="https://www.facebook.com/plugins/like.php?href=https://meaningoflife.herokuapp.com&width=248&layout=button_count&action=like&size=large&show_faces=true&share=true&height=46&appId=143455512882934"
          width="248"
          height="46"
          scrolling="no"
          allowTransparency="true"
          className="social-share-facebook"
        >
        </iframe>
      </div>
    )
  }
}
