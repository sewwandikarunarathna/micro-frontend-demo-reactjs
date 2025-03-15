import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routeConfig from "./routesConfig";
import ProtectedRoute from "./ProtectedRoute";
import { dataService } from "../services/DataService";
// import button from 'auth/Login';


const AppRoutes = () => {
  const [isLoggedIn, setisLoggedIn] = useState<string>(dataService.isLoggedIn ?? '');
  

  return (
    <Routes>
      {routeConfig.map(({ path, element, allowedRoles }) => (
        <Route
          key={path}
          path={path}
          element={
            (allowedRoles as string[])?.includes('Guest') ? (
            // (allowedRoles as string[])?.length === 1 && (allowedRoles as string[])[0] === 'Guest' ? (
              isLoggedIn === 'true' ? (
              (allowedRoles as string[])?.length === 1 && (allowedRoles as string[])[0] === 'Guest' ? (<Navigate to="/home" />) : (<>{element}</>)
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
