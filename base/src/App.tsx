import { lazy, Suspense } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { StoreProvider } from "base/GlobalStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layouts/Layout";
import Layout1 from "./layouts/Layout1";
import FullPageLoader from "./components/FullPageLoader";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const NotFound = lazy(() => import("./components/NotFound"));
const HostLogin = lazy(() => import("./components/HostLogin"));
const MatTable = lazy(() => import("./components/MatTable"));
const UserTable = lazy(() => import("./components/UserTable"));
const RowActionTable = lazy(() => import("./components/RowActionTable"));

const queryClient = new QueryClient();

//react query setup in App.tsx
const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

function App() {
  return (
      <AuthProvider>
    <QueryClientProvider client={queryClient}>
       <Suspense fallback={<FullPageLoader />}>
    <ReactQueryDevtoolsProduction />
         <AppRoutes />
      </Suspense>
      <StoreProvider>
        <div className="flex justify-center items-center h-screen bg-green-800">
         {/* <Layout /> */}
         {/* <Layout1 /> */}
          {/* <AuthProvider>
            <AppRoutes />
          </AuthProvider> */}
          {/* <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NotFound />
                </Suspense>
              }
            />
            <Route
              path="/authLogin"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <HostLogin />
                </Suspense>
              }
            />
            <Route
              path="/table"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MatTable />
                </Suspense>
              }
            />
            <Route
              path="/userTable"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserTable />
                </Suspense>
              }
            />
            <Route
              path="/rowActionsTable"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RowActionTable />
                </Suspense>
              }
            />
          </Routes> */}
        </div>
      </StoreProvider>
    </QueryClientProvider>
      </AuthProvider>
  );
}

export default App;
