import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class GiphyItem extends Component {
  render() {
    const {
      data: { url, displayName, userAvatar, userProfile }
    } = this.props;
    return (
      <Item>
        <GifWrapper>
          <Gif src={url} />
          <Info>View Like Attachment</Info>
        </GifWrapper>
        <UserInfo>
          <Avatar src={userAvatar} />
          <a href={userProfile}> {displayName} </a>
        </UserInfo>
      </Item>
    );
  }
}

GiphyItem.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string,
    fullScreenUrl: PropTypes.string,
    displayName: PropTypes.string,
    userAvatar: PropTypes.string,
    userProfile: PropTypes.string
  })
};

GiphyItem.defaultProps = {};

const Item = styled.div`
  width: "100%",
  height: "100%",
`;

const GifWrapper = styled.div``;

const Gif = styled.img``;

const Info = styled.div``;

const UserInfo = styled.div``;

const Avatar = styled.img``;
