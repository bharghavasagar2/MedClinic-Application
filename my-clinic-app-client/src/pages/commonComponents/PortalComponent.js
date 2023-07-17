import React from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Portal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button style={{ color: 'red', position: 'absolute', top: '10px', right: '10px' }} onClick={onClose} className="modal-close">
          <AiOutlineClose size={24} />
        </button>
        <div className="modal-scrollable">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Portal;
