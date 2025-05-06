import { lazy, useState } from "react";
import { Paper } from "@mui/material";

const SharedButton = lazy(() => import("base/SharedButton"));

const GoogleSignin = () => {
  const [text, setText] = useState('');



  const handleLogin = () => {
    setText("you can google signin now");
  }

  return (
    <div className="flex flex-col content-center w-full bg-blue-400">
      <Paper className="flex flex-col content-center justify-center items-center h-full gap-4 p-6 m-8 bg-amber-200">
        <h1 className='text-4xl font-bold'>Google Signin in Auth</h1>
        <SharedButton onClick={handleLogin} variant="contained" children="Auth Login" />
          {text != '' ? (
            <h3>
             {text}
            </h3>
          ) : null}
      </Paper>
    </div>
   
  );
};

export default GoogleSignin;
