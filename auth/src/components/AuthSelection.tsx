import { lazy } from "react";
import { useUserStore } from "base/UserStore";
import { useAuthNavigation } from "../utils/useAuthNavigation";

const SharedButton = lazy(() => import("base/SharedButton"));

const AuthSelection = () => {
  const { user } = useUserStore();

  const { navigateTo, getPath } = useAuthNavigation();

  return (
    <div className="flex flex-col content-center justify-center items-center w-auto h-full gap-4 p-6 m-8 bg-amber-200">
      <h1 className="text-4xl font-bold">Hello {user.username}, Select what you need...</h1>
      <SharedButton
        type="primary"
        onClick={() => navigateTo("/login")}
        children={
            'Login'
        }
      />
     <SharedButton
        type="default"
        onClick={() => navigateTo("/signup")}
        children={
            'Signup'
        }
      />
       <SharedButton
        type="dashed"
        onClick={() => navigateTo("/googleSignin")}
        children={
            "Google Signin"
        }
      />
    </div>
  );
};

export default AuthSelection;
