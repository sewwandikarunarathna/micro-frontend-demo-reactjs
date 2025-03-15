import { Link, useNavigate } from 'react-router-dom'
import SharedButton from './SharedButton'
import { dataService } from '../services/DataService'
import { useEffect } from 'react';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // setisLoggedIn(dataService.isLoggedIn ?? '');
  }, [dataService.isLoggedIn]);
  console.log('data logout', dataService.isLoggedIn);

  const onClickLogout = () => {
    dataService.removeAccessToken();
    dataService.removeUserType();
    dataService.removeLoggedIn();
    console.log("Logout")
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
