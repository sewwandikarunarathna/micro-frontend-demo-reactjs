import { Navigate } from "react-router-dom";
import { dataService } from "../services/DataService";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  const { isLoggedIn, isAuthChecked, userType } = useAuth();
  // const [userType, setUserType] = useState("asd");

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (isAuthChecked && isLoggedIn) {
  //       // const decoded = token ? decodeToken(token) : null;
  //       const userData = dataService.token
  //         ? typeof dataService.token === "string"
  //           ? await dataService.decodeToken(dataService.token)
  //           : null
  //         : null;
  //         console.log('userdata',userData);
  //         const userType = userData?.userType;
  //       // setUserType(userData?.userType);
  //     }
  //   };
  //   fetchUserData();
  // }, [isAuthChecked, isLoggedIn]);

  // const userType = userData?.userType;
  console.log("isLoggedIn", !isLoggedIn);
  console.log("usetype truee?", !userType);
  console.log("usetype", userType);
  console.log("allowddd", allowedRoles);

  console.log("dta protected", !allowedRoles.includes(userType));

  if (!isAuthChecked) {
    return <div>Loading...</div>; // Show loader until auth check completes
  }

  if (!isLoggedIn || !userType || !allowedRoles.includes(userType)) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRoute;
