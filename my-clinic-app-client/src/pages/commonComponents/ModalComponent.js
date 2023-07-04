import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

export default function Modal({ icon, showModal, setShowModal, title, message, onClose, onConfirm }) {
  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                {!!icon && <FaExclamationCircle className="error-icon" />}
                {title}
              </h3>
              <button className="modal-close" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              {onConfirm && (
                <button className="modal-button modal-confirm" onClick={onConfirm}>
                  Confirm
                </button>
              )}
              <button className="modal-button modal-close" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

{/* <Modal
showModal={showModal}
setShowModal={setShowModal}
title="Confirmation"
message="Are you sure you want to delete this item?"
onClose={handleCloseModal}
onConfirm={handleConfirm}
/> */}