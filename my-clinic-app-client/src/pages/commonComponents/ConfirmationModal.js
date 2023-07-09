import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="text-center">
      <p>{message}</p>
      <div className="mt-4">
        <button className="px-4 py-2 mr-2 bg-green-500 text-white rounded" onClick={onConfirm}>
          Yes
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
