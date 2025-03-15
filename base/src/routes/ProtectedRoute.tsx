import { Navigate } from "react-router-dom";
import { dataService } from "../services/DataService";

const ProtectedRoute = ({ allowedRoles, children }: { allowedRoles: string[], children: React.ReactNode }) => {
    const isLoggedIn = dataService.isLoggedIn;
    const userType = dataService.userType;

    if (!isLoggedIn || !userType || !allowedRoles.includes(userType)) {
      return <Navigate to="/home" replace />;
    }
    return children;
  };

  export  default ProtectedRoute;