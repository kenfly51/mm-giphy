import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class GiphyContainer extends Component {
  render() {
    return <div>{JSON.stringify(this.props)}</div>
  }
}

GiphyContainer.propTypes = {
  url: PropTypes.string,
  apiKey: PropTypes.string,
  pageSize: PropTypes.number
}

GiphyContainer.defaultProps = {
  pageSize: 20,
  rating: "G"
}