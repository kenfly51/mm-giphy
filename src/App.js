import React, { Component, Fragment } from 'react';
import { GiphyContainer, GiphyItem, Modal } from './components';

class App extends Component {
  state = {
    showDetail: false,
    fullScreenUrl: '',
    title: ''
  };

  mapGifData = gif => {
    const { user, images, title } = gif;

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
      title,
      width,
      fullScreenUrl,
      displayName,
      userAvatar,
      userProfile
    };
  };

  onItemClick = ({ fullScreenUrl, title }) => {
    this.setState({
      showDetail: true,
      fullScreenUrl,
      title
    });
  };

  onFullItemClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onCloseModal = () => {
    this.setState({
      showDetail: false,
      fullScreenUrl: '',
      title: ''
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
    const { showDetail, fullScreenUrl, title } = this.state;
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
          <img src={fullScreenUrl} onClick={this.onFullItemClick} alt={title} />
        </Modal>
      </Fragment>
    );
  }
}

export default App;
