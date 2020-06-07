import React, { useState, useEffect, useRef, createContext } from 'react';

export const ModalContext = createContext();

export const ModalProvider = props => {
  const modalRef = useRef();
  const [modalItems, setModalItems] = useState();

  useEffect(() => {
    setModalItems(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={modalItems}>
        {props.children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};
