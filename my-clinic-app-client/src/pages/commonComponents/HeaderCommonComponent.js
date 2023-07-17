import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/medclinic-logo.jpg';
import { clearData } from '../../security/sessionStorage';
import { resetProperty } from '../../redux/reducers/resetSlice';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/reducers/authenticationSlice';
import { LOGOUT } from '../../commonConfig/commonConfig';

const HeaderComponent = ({ headerName }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut({ data: '' }));
    dispatch(resetProperty('authentication', 'token'));
    dispatch({ type: LOGOUT });
    clearData();
  }
  return (
    <header className="bg-white shadow-sm bg-opacity-40">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to='/dashboard' className="w-64 h-15">
          <img className="w-full h-full object-cover" src={logo} alt="icon" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold" style={{ marginRight: '10rem' }}>{headerName || 'Dashboard'}</h1>
        </div>


        <div>
          <Link onClick={handleLogout} className="text-red-500 hover:text-red-600 font-semibold">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
