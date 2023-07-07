import React, { useState } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Cards from 'react-credit-cards-2';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [name, setName] = useState('');
  const [focused, setFocused] = useState('');
  const [errors, setErrors] = useState({});

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setCardNumber(value);
    validateCardNumber(value);
  };

  const handleExpiryChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setExpiry(value);
    validateExpiry(value);
  };

  const handleCVCChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setCVC(value);
    validateCVC(value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const validateCardNumber = (value) => {
    const maxLength = 16;
    if (value.length !== maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardNumber: `Card number should be ${maxLength} digits`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardNumber: '',
      }));
    }
  };

  const validateExpiry = (value) => {
    const maxLength = 4;
    if (value.length !== maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expiry: 'Invalid expiry date',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expiry: '',
      }));
    }
  };

  const validateCVC = (value) => {
    const maxLength = 3;
    if (value.length !== maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cvc: `Entered Invalid CVC`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cvc: '',
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    // Proceed with form submission
    // ...

    // Display a confirmation message to the user
    alert('Your appointment request has been submitted. Payment will be processed after approval.');
  };

  return (
    <div className="flex flex-col space-y-4">
      <Cards
        number={cardNumber}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focused}
      />
      <div className="flex flex-col">
        <label htmlFor="cardNumber" className="text-gray-700">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          onFocus={() => setFocused('number')}
          maxLength={16}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.cardNumber && <span className="text-red-500">{errors.cardNumber}</span>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700">Card Holder Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="expiry" className="text-gray-700">Expiry Date:</label>
        <input
          type="text"
          id="expiry"
          name="expiry"
          value={expiry}
          onChange={handleExpiryChange}
          onFocus={() => setFocused('expiry')}
          maxLength={4}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.expiry && <span className="text-red-500">{errors.expiry}</span>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="cvc" className="text-gray-700">CVC:</label>
        <input
          type="text"
          id="cvc"
          name="cvc"
          value={cvc}
          onChange={handleCVCChange}
          onFocus={() => setFocused('cvc')}
          maxLength={3}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.cvc && <span className="text-red-500">{errors.cvc}</span>}
      </div>
      <p className="text-gray-600 text-sm">
        Please note that your card will not be charged until the appointment request is approved. Thank you for your understanding.
      </p>
      <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default PaymentForm;
