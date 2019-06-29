import React, { Component, Fragment } from 'react';
import { GiphyContainer, GiphyItem, Modal } from './components';
import placeholder from './assets/image_placeholder.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const random = range => Math.floor(Math.random() * range + 1);

const randomFakeData = () => {
  return {
    view: random(100),
    like: random(200),
    comment: random(50),
    attachment: 'link'
  };
};

class App extends Component {
  state = {
    showDetail: false,
    fullScreenUrl: '',
    title: ''
  };

  mapGifData = gif => {
    const { user, images, title } = gif;

    const { fixed_width, original } = images;
    const { url, width, height } = fixed_width;
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
      height,
      fullScreenUrl,
      displayName,
      userAvatar,
      userProfile,
      ...randomFakeData()
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
        placeholder={placeholder}
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
          tablet={3}
          phone={2}
          autoLoadMore
        />
        <Modal show={showDetail} onClose={this.onCloseModal}>
          <img src={fullScreenUrl} onClick={this.onFullItemClick} alt={title} />
        </Modal>
      </Fragment>
    );
  }
}

export default App;
