import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { setData } from '../security/sessionStorage'

const PrivateRoutes = () => {
  let authReducer = useSelector(state => state.authentication);
  let token = authReducer.token || setData('userDetails')?.token;
  return (
    !!token ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes