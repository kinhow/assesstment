import React, { useContext } from 'react';
import ReactDOM from "react-dom";
import { ModalContext } from '../../context/modalContext';
import styles from './modal.module.scss';

const Modal = props => {
  const { onClose, children, className, ...rest } = props;
  const modalNode = useContext(ModalContext);

  return modalNode
    ? ReactDOM.createPortal(
        <div className={`${styles.modalOverlay} ${className}`}>
          <div className={styles.modalDialog} {...rest}>
            {children}
          </div>
        </div>,
        modalNode
      )
    : null;
};

export default Modal;
