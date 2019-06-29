import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GiphyImageLoader } from '../GiphyImageLoader';
import { Icon } from '../Icon';

export class GiphyItem extends Component {
  render() {
    const {
      data: {
        url,
        displayName,
        userAvatar,
        userProfile,
        width,
        title,
        attachment,
        view,
        comment,
        like
      },
      autoWidth,
      onClick,
      placeholder
    } = this.props;

    const widthObj = !autoWidth && {
      width
    };
    return (
      <Item>
        <GifWrapper {...widthObj} onClick={onClick}>
          <GiphyImageLoader src={url} alt={title} placeholder={placeholder} />
          <Info>
            {attachment && <Icon name="paperclip" />}
            <Actions>
              {view && (
                <Action>
                  <Icon name="eye" />
                  <span>{view}</span>
                </Action>
              )}
              {comment && (
                <Action>
                  <Icon name="comment" />
                  <span>{comment}</span>
                </Action>
              )}
              {like && (
                <Action>
                  <Icon name="heart" />
                  <span>{like}</span>
                </Action>
              )}
            </Actions>
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
    title: PropTypes.string,
    width: PropTypes.string,
    fullScreenUrl: PropTypes.string,
    displayName: PropTypes.string,
    userAvatar: PropTypes.string,
    userProfile: PropTypes.string,
    attachment: PropTypes.string,
    view: PropTypes.number,
    comment: PropTypes.number,
    like: PropTypes.number
  }).isRequired,
  autoWidth: PropTypes.bool,
  onClick: PropTypes.func,
  placeholder: PropTypes.string
};

GiphyItem.defaultProps = {
  autoWidth: false,
  onClick: () => {},
  placeholder: ''
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

const Info = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: flex;
`;

const Action = styled.div`
  margin-left: 10px;
  font-size: 0.8em;

  span {
    margin-left: 5px;
  }
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
