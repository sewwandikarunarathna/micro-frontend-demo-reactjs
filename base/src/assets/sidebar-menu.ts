
export const userMenuList = [
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

export const licenseAdminMenuList   = [
  { title: "License Admin 1", icon: "DashboardIcon", url: "/home" },
  { title: "License Admin 2", icon: "DashboardIcon", url: "/home" },
  { title: "License Admin 3", icon: "DashboardIcon", url: "/home" },
];

export const systemEnablementMenuList   = [
  { title: "Country", icon: "DashboardIcon", url: "/home" },
  { title: "Currency", icon: "DashboardIcon", url: "/home" },
  { title: "Language", icon: "DashboardIcon", url: "/home" },
  { title: "UOM", icon: "DashboardIcon", url: "/home" },
  { title: "Time Zone", icon: "DashboardIcon", url: "/home" },
];