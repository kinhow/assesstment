import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './card.module.scss'

const Card = (props) => {
  const {
    name,
    isTask,
    className,
    children,
    value,
    onChange,
  } = props;

  const cardClassName = [styles.card];
  className && cardClassName.push(className);

  return (
    <div className={cardClassName.join(' ')}>
      <div className={styles.cardBox}>
        <div className={styles.cardName}>{name}</div>
        
        {isTask && (
          <input
            className={styles.cardInput}
            name={'name'}
            type={"text"}
            placeholder={"Task Name"}
            value={value}
            onChange={onChange}
          />
        )}

        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  isTask: PropTypes.bool,
  onChange: PropTypes.func
};

Card.defaultProps = {
  name: '',
  className: '',
  isTask: false,
  onChange: () => {}
};

export default Card;