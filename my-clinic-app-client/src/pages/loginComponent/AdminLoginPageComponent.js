import { useState } from 'react';
import adminImage from '../../images/admin_Login.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authenticationSlice';

import backgroundImage from '../../images/homepage.jpg';
const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const handleLogin = (e) => {
    e.preventDefault();

    // Reset the error message
    setErrorMessage('');

    // Perform field validation
    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    let data = { username, password, role: 'admin' };
    dispatch(login({ data }));
    console.log(state)
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }} >
      <div className="mx-auto p-8 bg-white bg-opacity-50 rounded-lg shadow-lg max-w-lg">
        <img src={adminImage} alt="Admin" className="w-32 h-32 mx-auto mb-4 rounded-full" />
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              size={50}
              id="username"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern=".{4,}"
              title="Password must be at least 4 characters"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <Link
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handleLogin}
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

