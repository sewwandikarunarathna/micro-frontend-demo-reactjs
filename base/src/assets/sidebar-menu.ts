import DashboardIcon from "@mui/icons-material/Dashboard";
import { url } from "inspector";

export const sidebarMenuList = [
  { title: "Dashboard", icon: "DashboardIcon", url: "/home" },
  { title: "Users", icon: "UsersIcon", url: "/table" },
  { title: "User", icon: "OneUserIcon", url: "/user" },
  { title: "User Details", icon: "OneUserIcon", url: "/user-details" },
  { title: "Tables", icon: "TableIcon",
    gap: true,
    subMenu: [
      { title: "Users table", url: "/userTable" },
      { title: "Row Action Table", url: "/rowActionsTable" },
    ],
    key: "tables",
  },
  {
    title: "Inbox",
    icon: "ChatIcon",
    gap: true,
    subMenu: [
      { title: "Requested Messages", url: "/" },
      { title: "Unread Messages", url: "/" },
      { title: "All Messages", url: "/" },
    ],
    key: "inbox",
  },
  { title: "Calendar", icon: "CalendarIcon", url: "/calendar" },
  { title: "Support", icon: "SupportIcon" },
  {
    title: "Setting",
    icon: "SettingsIcon",
    subMenu: [
      { title: "General", url: "/" },
      { title: "Security", url: "/" },
      { title: "Notifications", url: "/" },
    ],
    key: "settings",
  },
];
