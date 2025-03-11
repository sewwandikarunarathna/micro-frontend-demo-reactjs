import { lazy } from "react";
import { useGlobalStore } from "base/GlobalStore";
const AuthLoginModule = lazy(() => import("auth/Login"));

const HostLogin = () => {
  const { user } = useGlobalStore();

  return (
    <div className="flex flex-col justify-center items-center content-center w-full">
      <h1 className="text-3xl pb-11">Base Login Page</h1>
      <AuthLoginModule />
      {user.username != "" || user.email != "" || user.password != "" ? (
        <h3>
          User Info: {user.username} | {user.email} | {user.password}
        </h3>
      ) : null}
    </div>
  );
};

export default HostLogin;
