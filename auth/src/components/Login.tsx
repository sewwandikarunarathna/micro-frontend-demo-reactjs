import { lazy } from "react";
import TextField from '@mui/material/TextField';

const SharedButton = lazy(() => import("base/SharedButton"));

const Login = () => {
  return (
    <>
    <div className="p-4 bg-gray-200">
    <h1>Login in Auth Module</h1>
    <TextField id="outlined-basic" label="Username" variant="outlined" />
    <TextField id="outlined-basic" label="Password" variant="outlined" />
    <SharedButton variant="contained" text="Auth Button" />

    </div>

    </>
  )
}

export default Login
