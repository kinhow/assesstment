import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './button.module.scss';

const Button = (props) => {
  const {
    onClick,
    className,
    longButton,
    shortButton
  } = props;

  const buttonClassName = [styles.button];
  className && buttonClassName.push(className);
  longButton && buttonClassName.push(styles.longButton);
  shortButton && buttonClassName.push(styles.shortButton);

  return (
    <div className={buttonClassName.join(' ')} onClick={onClick}>+ New Task</div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  longButton: PropTypes.bool,
  shortButton: PropTypes.bool
};

Button.defaultProps = {
  onClick: () => {},
  longButton: false,
  shortButton: false
}

export default Button;
