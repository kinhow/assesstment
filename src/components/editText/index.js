import React, { useState, useEffect, useRef } from 'react'
import { useKeyPress, useOnClickOutside } from '../../hooks/useKeyPress';
import DOMPurify from "dompurify";
import styles from './editText.module.scss';

const EditText = (props) => {
  const { text } = props;
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeyPress("Enter");
  const esc = useKeyPress("Escape");

  const hiddenTextClassName = !isInputActive ? styles.active : styles.hidden;
  const showTextClassName = isInputActive ? styles.active : styles.hidden;


  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        onSetText(inputValue);
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(text);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]);

  return (
    <div className={styles.textBox} ref={wrapperRef}>
      <div className={hiddenTextClassName.join(' ')} ref={textRef}>
        {text}
      </div>
      <input
        ref={inputRef}
        value={inputValue}
        style={{ minWidth: Math.ceil(inputValue.length) + "ch" }}
        onChange={e => setInputValue(DOMPurify.sanitize(e.target.value))}
        className={showTextClassName.join(' ')}
      />
    </div>
  );
};

export default EditText;
