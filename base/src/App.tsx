import { lazy, Suspense } from "react";
import "./App.css";
// import { StoreProvider } from "base/GlobalStore";
// import { StoreProvider } from "base/userStore";
import { StoreProvider } from "./state_management/storeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import FullPageLoader from "./components/FullPageLoader";
import { ConfigProvider } from "antd";
import { themeConfig } from "./configs/themeConfig";


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
      <ConfigProvider theme={themeConfig}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<FullPageLoader />}>
            <ReactQueryDevtoolsProduction />
            <AppRoutes />
          </Suspense>
        </QueryClientProvider>
      </ConfigProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
