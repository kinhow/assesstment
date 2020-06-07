import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './image.module.scss';

const Image = (props) => {
  const {
    className,
    ...rest
  } = props;

  const imageClassName = [styles.image];
  className && imageClassName.push(className);

  return (
    <img className={imageClassName.join(' ')} alt={''} {...rest} />
  );
};

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
};

Image.defaultProps = {
  alt: '',
  className: '',
};

export default Image;
