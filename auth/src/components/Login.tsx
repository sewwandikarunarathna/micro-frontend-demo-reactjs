import { lazy, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import { useGlobalStore } from "base/GlobalStore";
import {DataService} from "base/DataService";

const SharedButton = lazy(() => import("base/SharedButton"));

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('User');
   
  //access global store from base module
  const { user, login } = useGlobalStore();
  const dataService = new DataService();

  useEffect(() => {
    // console.log('user', user);
    // console.log('data servv', dataService);
  }, [user]);
// console.log('user', user);

  const handleLogin = () => {
    login({ username, password, email, userRole });
    dataService.setLoggedIn(true);
    dataService.setUserType(userRole);
    alert(`Welcome ${username}!, You Signed in as a ${userRole} eith the Email: ${email} and Password: ${password}`);
  }

  return (
    <div className="flex flex-col content-center w-full bg-blue-400">
      <Paper className="flex flex-col content-center justify-center items-center h-full gap-4 p-6 m-8 bg-amber-200">
        <h1 className='text-4xl font-bold'>Login in Auth</h1>
        <TextField id="outlined-basic" name={username} type="text" onChange={(e)=>setUsername(e.target.value)} label="Username" variant="outlined" />
        <TextField id="outlined-basic" name={email} type="text" onChange={(e)=>setEmail(e.target.value)} label="Email" variant="outlined" />
        <TextField id="outlined-basic" name={password} type="password" onChange={(e)=>setPassword(e.target.value)} label="Password" variant="outlined" />
        <SharedButton onClick={handleLogin} variant="contained" text="Auth Login" />
          {user.username != '' ||user.email != '' || user.password != '' ? (
            <h3>
              User Info: {user.username} | {user.email} | {user.password}
            </h3>
          ) : null}
      </Paper>
    </div>
  );
};

export default Login;
