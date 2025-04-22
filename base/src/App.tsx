import { lazy, Suspense } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
// import { StoreProvider } from "base/GlobalStore";
// import { StoreProvider } from "base/userStore";
import { StoreProvider } from "./state_management/storeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layouts/Layout";
import Layout1 from "./layouts/Layout1";
import FullPageLoader from "./components/FullPageLoader";
import ThemeLayout from "./layouts/ThemeLayout";

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
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<FullPageLoader />}>
            <ReactQueryDevtoolsProduction />
            <AppRoutes />
          </Suspense>
        </QueryClientProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
