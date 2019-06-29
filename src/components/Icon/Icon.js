import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = ({ color, name }) => {
  return <FontAwesomeIcon icon={name} color={color} />;
};

Icon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired
};

Icon.defaultProps = {
  color: '#6b6b6b'
};
