import { lazy, useState } from "react";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useUserStore } from "base/UserStore";

const SharedButton = lazy(() => import("base/SharedButton"));

const AuthSelection = () => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col content-center justify-center items-center w-auto h-full gap-4 p-6 m-8 bg-amber-200">
      <h1 className="text-4xl font-bold">Hello {user.username}, Select what you need...</h1>
      <SharedButton
        type="primary"
        children={
          <Link to="/auth/authLogin" className="m-20">
            Login
          </Link>
        }
      />
     <SharedButton
        type="default"
        children={
          <Link to="/signup" className="m-20">
            Signup
          </Link>
        }
      />
       <SharedButton
        type="dashed"
        children={
          <Link to="/googleSignin" className="m-20">
            Google Signin
          </Link>
        }
      />
    </div>
  );
};

export default AuthSelection;
