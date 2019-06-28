import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Modal extends Component {
  render() {
    const { show, onClose, children } = this.props;
    return (
      <Overlay show={show} onClick={onClose}>
        {children}
      </Overlay>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  show: false,
  onClose: () => {}
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000f0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ show }) => `visibility: ${show ? 'visible' : 'hidden'}`}
`;
