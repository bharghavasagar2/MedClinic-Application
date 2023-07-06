import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authenticationSlice';
import Modal from '../commonComponents/ModalComponent';
import { FaExclamationCircle } from 'react-icons/fa';
import adminImage from '../../images/admin_Login.png';
import backgroundImage from '../../images/homepage.jpg';
import { resetProperty } from '../../redux/reducers/resetSlice';
import TextInput from '../commonComponents/TextInputCommonComponent';
import { setData } from '../../security/sessionStorage';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const authentication = useSelector(state => state.authentication);

  const handleLogin = (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const data = { username, password, role: 'admin' };
    dispatch(login({ data }));
  };

  const handleCloseModal = () => {
    dispatch(resetProperty('authentication', 'error'));
    setShowModal(false);
  };



  useEffect(() => {
    if (authentication.loggedIn && authentication.token) {
      navigate('/dashboard');
    } else if (!authentication.loggedIn && !!authentication.error) {
      setShowModal(true);
    }
  }, [authentication, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="mx-auto p-8 bg-white bg-opacity-50 rounded-lg shadow-lg max-w-lg">
        <img src={adminImage} alt="Admin" className="w-32 h-32 mx-auto mb-4 rounded-full" />
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <TextInput
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded" onClick={handleLogin}>Login</button>
        </form>
      </div>
      {/* Modal here */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Error"
        message={!authentication.loggedIn && authentication.error}
        onClose={handleCloseModal}
        icon={FaExclamationCircle}
      />
    </div>
  );
};

export default AdminLogin;
