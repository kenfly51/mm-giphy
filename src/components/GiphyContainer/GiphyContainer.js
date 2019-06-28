import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class GiphyContainer extends Component {
  state = {
    gifs: [],
    isLoading: false,
    page: 0,
    hasMore: false
  };

  componentDidMount() {
    this.loadGifs();
  }

  buildQueryParams = offset => {
    const { apiKey, pageSize, rating } = this.props;

    const queryParams = [];

    if (apiKey) {
      queryParams.push(`apiKey=${apiKey}`);
    }
    if (offset) {
      queryParams.push(`offset=${offset}`);
    }
    if (pageSize) {
      queryParams.push(`limit=${pageSize}`);
    }
    if (rating) {
      queryParams.push(`rating=${rating}`);
    }

    return queryParams;
  };

  buildUrl = offset => {
    const { url } = this.props;
    const queryParams = this.buildQueryParams(offset);
    const query = queryParams.join('&');

    return `${url}?${query}`;
  };

  loadGifs = offset => {
    const { page, isLoading } = this.state;

    if (isLoading) {
      return;
    }

    const url = this.buildUrl(offset);

    this.setState(
      {
        isLoading: true
      },
      () => {
        fetch(url, {
          method: 'get'
        })
          .then(res => res.json())
          .then(response => {
            let gifs = response.data;
            let hasMore = true;
            const { total_count, count, offset } = response.pagination;
            if (total_count <= count + offset) {
              hasMore = false;
            }

            this.setState({
              gifs: this.state.gifs.concat(gifs),
              page: page + 1,
              isLoading: false,
              hasMore: hasMore
            });
          });
      }
    );
  };

  render() {
    const { renderItem, pc, phone, tablet } = this.props;
    const { gifs } = this.state;
    return (
      <Container>
        {gifs.map(gif => (
          <Item {...{ pc, phone, tablet }} key={gif.id}>
            {renderItem(gif)}
          </Item>
        ))}
      </Container>
    );
  }
}

GiphyContainer.propTypes = {
  url: PropTypes.string,
  apiKey: PropTypes.string,
  pageSize: PropTypes.number,
  renderItem: PropTypes.func,
  rating: PropTypes.string,
  pc: PropTypes.number.isRequired,
  phone: PropTypes.number,
  tablet: PropTypes.number
};

GiphyContainer.defaultProps = {
  pageSize: 20,
  rating: 'G'
};

const getWidthString = (numOfColumn, margin) => {
  if (!numOfColumn) return;
  const width = 100 / numOfColumn;

  return `
    width: calc(${width}% - ${margin * 2}px);
    margin: ${margin}px;
  `;
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  /* PC */
  ${({ pc }) => pc && getWidthString(pc, 20)};

  /* Tablets (portrait) */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
    ${({ tablet }) => tablet && getWidthString(tablet, 15)};
  }

  /* Phones (portrait) */
  @media only screen and (max-width: 320px) {
    ${({ phone }) => phone && getWidthString(phone, 5)};
  }
`;
