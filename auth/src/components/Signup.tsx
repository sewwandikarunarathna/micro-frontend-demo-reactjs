import { lazy, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
// import { useUserStore } from "base/UserStore";
// import {DataService} from "base/DataService";
// import { useAuth } from 'base/AuthContext';

// const SharedButton = lazy(() => import("base/SharedButton"));

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('User');
   
  //access global store from base module
  // const { user, login } = useGlobalStore();
  // const { user, loginUser, logoutUser } = useUserStore();
  // const dataService = new DataService();
  // const { loginContext } = useAuth();

  // useEffect(() => {
  //   // console.log('user', user);
  //   // console.log('data servv', dataService);
  // }, [user]);
// console.log('user', user);

  const handleLogin = () => {
    // loginUser({ username, password, email, userRole });
    // // loginUser({ username, password, email, userRole });
    // loginContext('User');
    // // dataService.setLoggedIn(true);
    // // dataService.setUserType(userRole);
    alert(`Welcome ${username}!, You Signed in as a ${userRole} eith the Email: ${email} and Password: ${password}`);
  }

  return (
    <div className="flex flex-col content-center w-full bg-blue-400">
      <Paper className="flex flex-col content-center justify-center items-center h-full gap-4 p-6 m-8 bg-amber-200">
        <h1 className='text-4xl font-bold'>Signup in Auth</h1>
        <TextField id="outlined-basic" name={username} type="text" onChange={(e)=>setUsername(e.target.value)} label="Username" variant="outlined" />
        <TextField id="outlined-basic" name={email} type="text" onChange={(e)=>setEmail(e.target.value)} label="Email" variant="outlined" />
        <TextField id="outlined-basic" name={password} type="password" onChange={(e)=>setPassword(e.target.value)} label="Password" variant="outlined" />
        <Button onClick={handleLogin} variant="contained" children="Auth Signup" />
          {/* {user.username != '' ||user.email != '' || user.password != '' ? (
            <h3>
              User Info: {user.username} | {user.email} | {user.password}
            </h3>
          ) : null} */}
      </Paper>
    </div>
   
  );
};

export default Signup;
