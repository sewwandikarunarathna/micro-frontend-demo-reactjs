import { lazy, Suspense } from "react";
import "./App.css";
import { createBrowserRouter, Link, Route, RouterProvider, Routes } from "react-router-dom";
import { StoreProvider } from "base/StoreProvider";
import { AuthProvider } from "base/AuthContext";
import { createRoot } from "react-dom/client";

const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const GoogleSignin = lazy(() => import("./components/GoogleSignin"));
const AuthSelection = lazy(() => import("./components/AuthSelection"));

const router = createBrowserRouter([
  { path: '/', element: <Signup/>},
  { path: '/googleSignin', element: <GoogleSignin /> }
])

function App() {
  return (
    <AuthProvider>
    <StoreProvider>
    {/* <Link to="/" className="m-20">
    //     Home
    //   </Link>
    //   <Link to="/login">Login</Link>
    //   <Link to="/signup">Signup</Link> */}
   {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AuthSelection />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          }
        />
         <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
          <Route
          path="/googleSignin"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <GoogleSignin />
            </Suspense>
          }
        />
         <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              404 Not Found
            </Suspense>
          }
        />
      </Routes>
    {/* <Route path="/signup" element={<div>Signup Page</div>} /> */}
    </StoreProvider>

    </AuthProvider>



    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Auth Module</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  );
}

export default App;

// Standalone run
// if (import.meta.env.DEV) {
//   createRoot(document.getElementById('root')!).render(<App />)
// }