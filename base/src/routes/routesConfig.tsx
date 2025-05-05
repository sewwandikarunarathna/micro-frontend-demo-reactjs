import { lazy, Suspense } from "react";
import UserGroups from "../modules/user/tab-components/UserGroups";

const Welcome = lazy(() => import("../components/Welcome"));
const Home = lazy(() => import("../components/Home"));
const About = lazy(() => import("../components/About"));
const NotFound = lazy(() => import("../components/NotFound"));
const HostLogin = lazy(() => import("../components/HostLogin"));
const MatTable = lazy(() => import("../components/MatTable"));
const SubTable = lazy(() => import("../components/SubTable"));
const UserTable = lazy(() => import("../components/UserTable"));
const RowActionTable = lazy(() => import("../components/RowActionTable"));
const UserDetails = lazy(() => import("../components/UserDetails"));
const AntUserDetails = lazy(() => import("../components/AntUserDetails"));
const Logout = lazy(() => import("../components/Logout"));
const Layout1 = lazy(() => import("../layouts/Layout1"));
const AntLayout = lazy(() => import("../layouts/AntLayout"));
const UserGroup = lazy(() => import("../modules/user/tab-components/UserGroup"));

const routeConfig: RoutesType[] = [
  {
    path: "/authLogin",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HostLogin />
      </Suspense>
    ),
    allowedRoles: ["Guest"], // Only accessible for non-logged-in users
  },
  // {
  //   path: "/register",
  //   element: <SignUp />,
  //   allowedRoles: ["Guest"],
  // },
  {
    path: "/table",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MatTable />
      </Suspense>
    ),
    allowedRoles: ["User", "Admin"],
    children: [
      {
        path: "row/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SubTable />
          </Suspense>
        ),
        // allowedRoles: ["User", "Admin"],
      },
    ],
  },
  {
    path: "/userTable",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserTable />
      </Suspense>
    ),
    allowedRoles: ["Admin"],
  },
  {
    path: "/rowActionsTable",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RowActionTable />
      </Suspense>
    ),
    allowedRoles: ["Admin"],
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    ),
    allowedRoles: ["Guest", "User", "Admin"], // Accessible by all roles
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    allowedRoles: ["User", "Admin"], // Accessible by all roles
  },
  // {
  //   path: "/",
  //   element: <Suspense fallback={<div>Loading...</div>}>
  //                     <Welcome />
  //                   </Suspense>,
  //   allowedRoles: ["Guest", "User", "Admin"], // Accessible by all roles
  // },
  {
    path: "/user",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserDetails />
      </Suspense>
    ),
    allowedRoles: ["User", "Admin"],
  },
  {
    path: "/user-details",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AntUserDetails />
      </Suspense>
    ),
    allowedRoles: ["User", "Admin"],
  },
  {
    path: "/user-groups",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserGroups />
      </Suspense>
    ),
    allowedRoles: ["User", "Admin"],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
    allowedRoles: ["Guest", "User", "Admin"], // Accessible by all roles
  },
  {
    path: "/logout",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Logout />
      </Suspense>
    ),
    allowedRoles: ["User", "Admin"], // Accessible by all roles
  },
  {
    path: "/layout1",
    element: (
        <Layout1 />
    ),
    allowedRoles: ["User", "Admin"], // Accessible by all roles
  },
  {
    path: "/ant-layout",
    element: (
        <AntLayout />
    ),
    allowedRoles: ["Guest", "User", "Admin"], // Accessible by all roles
  },
];

export default routeConfig;

export type RoutesType = {
  path?: string;
  element?: any;
  allowedRoles?: string[] | [];
  children?: RoutesType[];
};
