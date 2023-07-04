import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import doctorIcon from '../../images/doctorIcon.png';
import patientIcon from '../../images/patientIcon.png';
import backgroundImage from '../../images/homepage.jpg';
import TextInput from '../commonComponents/TextInputCommonComponent';
import { create_UpdateById } from '../../redux/reducers/patientsSlice';
import { login } from '../../redux/reducers/authenticationSlice';
import { FaExclamation } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { resetProperty } from '../../redux/reducers/resetSlice';
import Modal from '../commonComponents/ModalComponent';


const LoginPage = () => {

  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const authentication = useSelector(state => state.authentication);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleLogin = () => {
    // Handle login logic
    // You can send a request to the backend to authenticate the user
    // and perform any necessary actions

    // For demo purposes, let's just log the user type, username, and password

    const data = { username, password, role: userType };
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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="mx-auto p-8 bg-white bg-opacity-50 rounded-lg shadow-lg max-w-lg">
        {userType === '' ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="flex justify-center mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4"
                onClick={() => handleUserTypeSelect('patient')}
              >
                <img src={patientIcon} alt="Patient" className="mr-2" /> Patient
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                onClick={() => handleUserTypeSelect('doctor')}
              >
                <img src={doctorIcon} alt="Doctor" className="mr-2" /> Doctor
              </button>
            </div>
          </div>

        ) : (
          <div className="flex flex-col items-center justify-center">
            <img src={userType === 'doctor' ? doctorIcon : patientIcon} alt="Login" className="w-40 h-40 mb-4 rounded-full" />
            <h2 className="text-2xl font-bold mb-4">Login as {userType}</h2>
            <form className="w-full">
              <TextInput
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextInput
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
            {userType === 'patient' && (
              <div className="mt-4 text-center">
                <p className="text-gray-700">New patient?</p>
                <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-semibold">
                  Sign up here
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Error"
        message={!authentication.loggedIn && authentication.error}
        onClose={handleCloseModal}
        icon={FaExclamation}
      />
    </div>
  );
};

export default LoginPage;
