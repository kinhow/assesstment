import React, { useState, useEffect, useRef, useContext } from 'react';
import * as PropTypes from 'prop-types';
import { UserContext } from '../../../../context/userContext';
import DOMPurify from "dompurify";
import { media } from '../../../../utils';
import { useKeyPress, useOnClickOutside } from '../../../../hooks';
import Image from '../../../../components/image';
import styles from './searchTask.module.scss';

const SearchTask = (props) => {
  const {
    itemId,
    itemName,
    onChange,
    onDelete,
    disabled,
  } = props;

  const { state } = useContext(UserContext);

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(itemName);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeyPress("Enter");
  const esc = useKeyPress("Escape");

  const hiddenTextClassName = !isInputActive ? styles.active : styles.hidden;
  const showTextClassName = isInputActive ? styles.active : styles.hidden;
  let disabledClassName = disabled ? styles.disabled : '';

  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      setInputValue(inputValue);
      setIsInputActive(false);
    }
  });

  const getConfig = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': state.token.token
    },
  };

  const putConfig = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': state.token.token
    },
    body: JSON.stringify({ name: inputValue })
  };

  const getAllTasks = async () => {
    const allTaskUrl = 'https://dev.teledirectasia.com:3092/tasks';
    const response = await fetch(allTaskUrl, getConfig);
    const data = await response.json();
    const results = data.tasks;
    const sortResults = results.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1);
    //const resultsFilter = filter(sortResults, value => value.name.includes(searchTask));
    
    console.log(sortResults);
  }

  const submitDoneTask = async (id) => {
    const newTaskUrl = `https://dev.teledirectasia.com:3092/tasks/${id}`;
    const response = await fetch(newTaskUrl, putConfig);
    const data = await response.json();
    console.log('data', data);
  };

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        setInputValue(inputValue);
        setIsInputActive(false);
        getAllTasks();
        submitDoneTask(itemId);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(itemName);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]);

  return (
    <div className={styles.listItem}>
      <input
        onChange={onChange}
        type={"checkbox"}
        id={itemId}
      />
      <label className={disabledClassName} ref={wrapperRef} htmlFor={itemId}>
        <div className={styles.textBox}>
          <div className={`${hiddenTextClassName} ${styles.listName} ${disabledClassName}`} ref={textRef} >
            {inputValue}
          </div>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(DOMPurify.sanitize(e.target.value))}
            className={`${showTextClassName} ${styles.listName}`}
          />
        </div>
      </label>

      <div className={styles.listIcon}>
        <div className={styles.icon} onClick={() => setIsInputActive(true)}>
          <Image src={media('pen-solid.svg')} alt='edit-icon' />
        </div>
        <div className={styles.icon} onClick={onDelete}>
          <Image src={media('trash-solid.svg')} alt='delete-icon' />
        </div>
      </div>
    </div>
  );
};

SearchTask.propTypes = {
  itemId: PropTypes.string,
  itemName: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
};

SearchTask.defaultProps = {
  itemId: '',
  itemName: '',
  disabled: false,
  onChange: () => {},
  onDelete: () => {},
  onSubmit: () => {},
};

export default SearchTask;