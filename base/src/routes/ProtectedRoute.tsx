import { Navigate } from "react-router-dom";
import { dataService } from "../services/DataService";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = async ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  const { isLoggedIn } = useAuth();
  const userData = dataService.token
    ? typeof dataService.token === "string" 
      ? await dataService.decodeToken(dataService.token) 
      : null
    : null;
console.log('dta protected',userData);

  const userType = userData?.userType;

  if (!isLoggedIn || !userType|| !allowedRoles.includes(userType)) {
    return <Navigate to="/about" replace />;
  }
  return children;
};

export default ProtectedRoute;
