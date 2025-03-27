import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routeConfig from "./routesConfig";
import ProtectedRoute from "./ProtectedRoute";
import { dataService } from "../services/DataService";
import { useAuth } from "../context/AuthContext";
import Layout1 from "../layouts/Layout1";
// import button from 'auth/Login';

const AppRoutes = () => {
  // const [isLoggedIn, setisLoggedIn] = useState<string>(dataService.isLoggedIn ?? '');
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {routeConfig.map(({ path, element, allowedRoles, children }) =>
        (allowedRoles as string[])?.includes("Guest") ? (
          <Route
            key={path}
            path={path}
            element={
              isLoggedIn ? (
                (allowedRoles as string[])?.length === 1 &&
                (allowedRoles as string[])[0] === "Guest" ? (
                  <Navigate to="/home" />
                ) : (
                  <>{element}</>
                )
              ) : (
                <>{element}</>
              )
            }
          >
            {children?.map((child) => (
              <Route
                key={child.path}
                path={child.path}
                element={
                  <ProtectedRoute
                    allowedRoles={child?.allowedRoles || allowedRoles || []}
                  >
                    {child.element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>
        ) : (
          <Route element={<Layout1 />} key={path}>
            <Route
              path={path}
              element={
                <ProtectedRoute allowedRoles={allowedRoles || []}>
                  {element}
                </ProtectedRoute>
              }
            >
              {children?.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={
                    <ProtectedRoute
                      allowedRoles={child?.allowedRoles || allowedRoles || []}
                    >
                      {child.element}
                    </ProtectedRoute>
                  }
                />
              ))}
            </Route>
          </Route>
        )
      )}
    </Routes>
  );
};

export default AppRoutes;
