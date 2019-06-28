import React, { Component } from 'react';
import { GiphyContainer, GiphyItem } from './components';

class App extends Component {
  mapGifData = gif => {
    const { user, images } = gif;

    const { fixed_width, original } = images;

    const { url } = fixed_width;
    const { url: fullScreenUrl } = original;

    const {
      display_name: displayName,
      avatar_url: userAvatar,
      profile_url: userProfile
    } = user || {};

    return {
      url,
      fullScreenUrl,
      displayName,
      userAvatar,
      userProfile
    };
  };

  renderItem = gif => {
    const itemData = this.mapGifData(gif);
    return <GiphyItem data={itemData} />;
  };

  render() {
    return (
      <GiphyContainer
        url="https://api.giphy.com/v1/gifs/trending"
        apiKey="eUVMjjobXnZldjnCYWVmfL4KrfUI3Is4"
        renderItem={this.renderItem}
      />
    );
  }
}

export default App;
