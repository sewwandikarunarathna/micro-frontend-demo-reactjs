import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routeConfig from "./routesConfig";
import ProtectedRoute from "./ProtectedRoute";
import { dataService } from "../services/DataService";
import { useAuth } from "../context/AuthContext";
// import button from 'auth/Login';

const AppRoutes = () => {
  // const [isLoggedIn, setisLoggedIn] = useState<string>(dataService.isLoggedIn ?? '');
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {routeConfig.map(({ path, element, allowedRoles, children }) => (
        <Route
          key={path}
          path={path}
          element={
            (allowedRoles as string[])?.includes("Guest") ? (
              // (allowedRoles as string[])?.length === 1 && (allowedRoles as string[])[0] === 'Guest' ? (
              isLoggedIn ? (
                (allowedRoles as string[])?.length === 1 &&
                (allowedRoles as string[])[0] === "Guest" ? (
                  <Navigate to="/home" />
                ) : (
                  <>{element}</>
                )
              ) : (
                <>
                  {element}
                </>
              )
            ) : (
              <ProtectedRoute allowedRoles={allowedRoles || []}>
                {element}
              </ProtectedRoute>
            )
          }
        >
          {/* {children?.map(({ path, element, allowedRoles }) => ( */}
          {children?.map((child) => (
            <Route
              key={child.path}
              path={child.path}
              element={
                // (allowedRoles as string[])?.includes("Guest") ? (
                //   isLoggedIn ? (
                //     <Navigate to="/about" replace />
                //   ) : (
                //     child.element
                //   )
                // ) : (
                  <ProtectedRoute allowedRoles={child?.allowedRoles || allowedRoles || []}>
                    {child.element}
                  </ProtectedRoute>
                // )
              }
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;
