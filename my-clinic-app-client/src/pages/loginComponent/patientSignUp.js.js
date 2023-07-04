import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create_UpdateById } from '../../redux/reducers/patientsSlice';
import backgroundImage from '../../images/homepage.jpg';
import TextInput from '../commonComponents/TextInputCommonComponent';

const PatientSignupForm = () => {
  const dispatch = useDispatch();
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!patientName.trim()) {
      errors.patientName = 'Patient name is required';
    }

    if (!patientAge.trim()) {
      errors.patientAge = 'Patient age is required';
    } else if (isNaN(patientAge)) {
      errors.patientAge = 'Invalid age';
    }

    if (!gender) {
      errors.gender = 'Gender is required';
    }

    if (!contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required';
    }

    if (!address.trim()) {
      errors.address = 'Address is required';
    }

    if (showCredentials) {
      if (!username.trim()) {
        errors.username = 'Username is required';
      } else if (username.includes(' ')) {
        errors.username = 'Username should not contain spaces';
      }

      if (!password.trim()) {
        errors.password = 'Password is required';
      } else if (password.length < 4) {
        errors.password = 'Password must be at least 4 characters long';
      }

      if (!confirmPassword.trim()) {
        errors.confirmPassword = 'Confirm Password is required';
      } else if (confirmPassword.trim() !== password.trim()) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    return errors;
  };

  const handlePatientDetailsSubmit = () => {
    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setShowCredentials(true);
  };

  const handleSignup = () => {
    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    let fieldObj = {
      role: 'patient',
      patient_name: patientName,
      patient_age: patientAge,
      patient_gender: gender,
      contact_number: contactNumber,
      address: address,
      username,
      password,
    };

    dispatch(create_UpdateById({ data: fieldObj }));
  };

  const handleGoBack = () => {
    setShowCredentials(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="mx-auto p-8 bg-white bg-opacity-50 rounded-lg shadow-lg max-w-lg">
        {!showCredentials ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Patient Signup</h2>
            <TextInput
              id="patientName"
              label="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              error={errors.patientName}
            />
            <TextInput
              id="patientAge"
              label="Patient Age"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              error={errors.patientAge}
            />
            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2 text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.gender ? 'border-red-500' : ''}`}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 mt-1">{errors.gender}</p>}
            </div>
            <TextInput
              id="contactNumber"
              label="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              error={errors.contactNumber}
            />
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : ''}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
              {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              onClick={handlePatientDetailsSubmit}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Patient Signup</h2>
            <TextInput
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
            <TextInput
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              error={errors.password}
            />
            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              error={errors.confirmPassword}
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-2"
              onClick={handleSignup}
            >
              Signup
            </button>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600 font-semibold ml-5 mt-2"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientSignupForm;
