import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Modal = ({ message, errorMessage, icon: Icon = FaExclamationCircle }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          {!!Icon ? <Icon className="modal-icon" /> : null}
        </div>
        <div className="modal-body">
          {errorMessage ? (
            <p className="modal-error-message">{errorMessage}</p>
          ) : (
            <p className="modal-message">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
