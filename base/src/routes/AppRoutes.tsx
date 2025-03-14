import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routeConfig from "./routesConfig";
import ProtectedRoute from "./ProtectedRoute";
import { dataService } from "../services/DataService";
// import button from 'auth/Login';


const AppRoutes = () => {
  const isLoggedIn = dataService.isLoggedIn;

  return (
    <Routes>
      {routeConfig.map(({ path, element, allowedRoles }) => (
        <Route
          key={path}
          path={path}
          element={
            (allowedRoles as string[])?.includes('Guest') ? (
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <>
                {console.log("element", element)
                }
                {element}
                </>
              )
            ) : (
              <ProtectedRoute allowedRoles={allowedRoles || []}>
                {element}
              </ProtectedRoute>
            )
          }
        />
      ))}
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
