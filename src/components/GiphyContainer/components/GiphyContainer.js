import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class GiphyContainer extends Component {
  state = {
    gifs: [],
    isLoading: false,
    page: 0,
    hasMore: false
  }

  componentDidMount() {
		this.loadGifs()
  }

  buildQueryParams = (offset) => {
    const { apiKey, pageSize, rating } = this.props;

    const queryParams = [];

    if (apiKey) {
			queryParams.push(`apiKey=${apiKey}`)
    }
		if (offset) {
			queryParams.push(`offset=${offset}`)
    }
    if (pageSize) {
			queryParams.push(`limit=${pageSize}`)
    }
    if (rating) {
			queryParams.push(`rating=${rating}`)
    }
    
    return queryParams;
  }

  buildUrl = (offset) => {
    const { url } = this.props;
    const queryParams = this.buildQueryParams(offset);
    const query = queryParams.join("&");

    return `${url}?${query}`;
  }
  
  loadGifs = (offset) => {
    const { page, isLoading } = this.state;
    
		if (isLoading) {
			return
    }

    const url = this.buildUrl(offset);

		this.setState({
			isLoading: true
		}, () => {
      fetch(url, {
        method: 'get'
      })
      .then(res => res.json())
      .then(response => {
        let gifs = response.data.map(g => g.images)
        let hasMore = true
        const { total_count, count, offset } = response.pagination
        if (total_count <= count + offset) {
          hasMore = false
        }
  
        this.setState({
          gifs: this.state.gifs.concat(gifs),
          page: page + 1,
          isLoading: false,
          hasMore: hasMore
        })
      })
    })
	}

  render() {
    return <div>{JSON.stringify(this.state)}</div>
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