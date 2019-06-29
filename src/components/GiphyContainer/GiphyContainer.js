import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

export class GiphyContainer extends Component {
  state = {
    gifs: [],
    isLoading: false,
    page: 0,
    hasMore: false
  };

  componentDidMount() {
    this.loadGifs();
    this.props.autoLoadMore &&
      document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    this.props.autoLoadMore &&
      document.removeEventListener('scroll', this.trackScrolling);
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

  loadMoreGifs = () => {
    const { pageSize } = this.props;
    const { page } = this.state;
    const newOffset = page * pageSize + 1;

    this.loadGifs(newOffset);
  };

  isBottom(el) {
    return (
      parseInt(el.getBoundingClientRect().bottom) <=
      parseInt(window.innerHeight)
    );
  }

  trackScrolling = () => {
    if (this.isBottom(this.containerElm)) {
      this.loadMoreGifs();
    }
  };

  render() {
    const { renderItem, pc, phone, tablet, autoLoadMore } = this.props;
    const { gifs, hasMore } = this.state;
    const showLoadMoreButton = hasMore && !autoLoadMore;
    const showLoadingMoreSpinner = hasMore && autoLoadMore;
    return (
      <>
        <Container ref={containerElm => (this.containerElm = containerElm)}>
          {gifs.map(gif => (
            <Item {...{ pc, phone, tablet }} key={gif.id}>
              {renderItem(gif)}
            </Item>
          ))}
        </Container>
        <LoaderWrapper>
          {showLoadMoreButton && (
            <LoadMoreButton onClick={this.loadMoreGifs}>
              Load more
            </LoadMoreButton>
          )}
          {showLoadingMoreSpinner && <Loader />}
        </LoaderWrapper>
      </>
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
  tablet: PropTypes.number,
  autoLoadMore: PropTypes.bool
};

GiphyContainer.defaultProps = {
  pageSize: 20,
  rating: 'G',
  autoLoadMore: false
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
  justify-content: center;
`;

const Item = styled.div`
  /* Phones (portrait) */
  ${({ phone }) => phone && getWidthString(phone, 5)};

  /* Tablets (portrait) */
  @media only screen and (min-width: 768px) {
    ${({ tablet }) => tablet && getWidthString(tablet, 15)};
  }

  /* PC */
  @media only screen and (min-width: 1024px) {
    ${({ pc }) => pc && getWidthString(pc, 20)};
  }
`;

const LoadMoreButton = styled.button`
  margin: 20px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  color: #007bff;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
`;

const roateFrame = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const roateAnimation = css`
  ${roateFrame} 1s linear infinite;
`;

const Loader = styled.div`
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  margin: 20px;
  border-width: 3px;
  border-style: solid;
  border-color: rgba(51, 54, 58, 0.4) transparent;
  border-radius: 13px;
  animation: ${roateAnimation};
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
