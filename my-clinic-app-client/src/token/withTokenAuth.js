import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { getData, setData } from '../security/sessionStorage'

const PrivateRoutes = () => {
  let authReducer = useSelector(state => state.authentication);
  setData('userDetails', authReducer)
  let token = authReducer.token || getData('userDetails')?.token;
  return (
    !!token ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes