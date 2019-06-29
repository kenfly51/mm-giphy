import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function elementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

export class GiphyImageLoader extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    this.handleScroll();

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (!this.state.loaded && elementInViewport(this.imgElm)) {
      const { src } = this.props;
      const imgLoader = new Image();
      imgLoader.src = src;
      imgLoader.onload = () => {
        this.imgElm.setAttribute(`src`, `${src}`);
        this.setState({
          loaded: true
        });
      };
    }
  };

  render() {
    const { alt, placeholder } = this.props;
    return (
      <StyledImage
        src={placeholder}
        ref={imgElm => (this.imgElm = imgElm)}
        alt={alt}
      />
    );
  }
}

GiphyImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  placeholder: PropTypes.string
};

GiphyImageLoader.defaultProps = {
  alt: '',
  placeholder: ''
};

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;
