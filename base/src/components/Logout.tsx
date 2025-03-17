import { Link, useNavigate } from 'react-router-dom'
import SharedButton from './SharedButton'
import { dataService } from '../services/DataService'
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // useEffect(() => {
  //   // setisLoggedIn(dataService.isLoggedIn ?? '');
  // }, [dataService.isLoggedIn]);
  // console.log('data logout', dataService.isLoggedIn);

  const onClickLogout = () => {
    logout();
    console.log("Logoutttttttttttttttt")
    navigate("/authLogin");
  }
  return (
    <div className="text-center mt-10">
    <h1 className="text-2xl">Are you sure you want to logout?</h1>
    <SharedButton onClick={onClickLogout} className="text-blue-500" text="Logout"/>
  </div>
  )
}

export default Logout
