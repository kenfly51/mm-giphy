import React, { Component, Fragment } from 'react';
import { GiphyContainer, GiphyItem, Modal } from './components';

class App extends Component {
  state = {
    showDetail: false,
    fullScreenUrl: ''
  };

  mapGifData = gif => {
    const { user, images } = gif;

    const { fixed_width, original } = images;
    const { url, width } = fixed_width;
    const { url: fullScreenUrl } = original;

    const {
      display_name: displayName,
      avatar_url: userAvatar,
      profile_url: userProfile
    } = user || {};

    return {
      url,
      width,
      fullScreenUrl,
      displayName,
      userAvatar,
      userProfile
    };
  };

  onItemClick = ({ fullScreenUrl }) => {
    this.setState({
      showDetail: true,
      fullScreenUrl
    });
  };

  onFullItemClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onCloseModal = () => {
    this.setState({
      showDetail: false,
      fullScreenUrl: ''
    });
  };

  renderItem = gif => {
    const itemData = this.mapGifData(gif);
    return (
      <GiphyItem
        data={itemData}
        onClick={() => {
          this.onItemClick(itemData);
        }}
      />
    );
  };

  render() {
    const { showDetail, fullScreenUrl } = this.state;
    return (
      <Fragment>
        <GiphyContainer
          url="https://api.giphy.com/v1/gifs/trending"
          apiKey="eUVMjjobXnZldjnCYWVmfL4KrfUI3Is4"
          renderItem={this.renderItem}
          pc={4}
          table={3}
          phone={2}
        />
        <Modal show={showDetail} onClose={this.onCloseModal}>
          <img src={fullScreenUrl} onClick={this.onFullItemClick} />
        </Modal>
      </Fragment>
    );
  }
}

export default App;
