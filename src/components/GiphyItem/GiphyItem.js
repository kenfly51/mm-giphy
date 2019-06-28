import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class GiphyItem extends Component {
  render() {
    const {
      data: { url, displayName, userAvatar, userProfile, width },
      autoWidth,
      onClick
    } = this.props;

    const widthObj = !autoWidth && {
      width
    };
    return (
      <Item>
        <GifWrapper {...widthObj} onClick={onClick}>
          <Gif src={url} />
          <Info>
            <div>Attachment</div>
            <div>actions</div>
          </Info>
        </GifWrapper>
        {userAvatar && (
          <UserInfo>
            <Avatar src={userAvatar} />
            <UserLink href={userProfile}> {displayName} </UserLink>
          </UserInfo>
        )}
      </Item>
    );
  }
}

GiphyItem.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.string,
    fullScreenUrl: PropTypes.string,
    displayName: PropTypes.string,
    userAvatar: PropTypes.string,
    userProfile: PropTypes.string
  }),
  autoWidth: PropTypes.bool,
  onClick: PropTypes.func
};

GiphyItem.defaultProps = {
  autoWidth: false,
  onClick: () => {}
};

const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const GifWrapper = styled.div`
  flex: 1;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0px 0px 5px 0px #d2d2d2;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ width }) => width && `max-width: ${width}px;`}
  cursor: pointer;
`;

const Gif = styled.img``;

const Info = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin: 5px;
`;

const UserLink = styled.a`
  text-decoration: none;
  font-size: 0.8em;
`;
