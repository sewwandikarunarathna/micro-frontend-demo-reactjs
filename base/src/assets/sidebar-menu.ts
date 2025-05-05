
export const sidebarMenuList = [
  { key: '1', title: "Dashboard", icon: "DashboardIcon", url: "/home" },
  { 
    key: '2',
    title: "Admin Setup", 
    icon: "TableIcon",
    gap: true,
    subMenu: [
      { 
        key: '2-1',
        title: "Users", 
        icon: "TableIcon",
        gap: true,
        subMenu: [
          { key: 4, title: "Users", url: "/table" },
          { key: 5, title: "User", url: "/user-details" },
        ],
      },
      { 
        key: '2-2',
        title: "System Enablement", 
        icon: "TableIcon",
        gap: true,
        subMenu: [
          { key: 7, title: "Country", url: "/country" },
          { key: 8, title: "Currency", url: "/currency" },
          { key: 9, title: "Language", url: "/language" },
          { key: 10, title: "UOM", url: "/uom" },
          { key: 11, title: "Time Zone", url: "/timezone" },
        ],
      },
      { 
        key: '2-3',
        title: "License", 
        icon: "TableIcon",
        gap: true,
        subMenu: [
          { key: 7, title: "License Activation", url: "/license-activation" },
        ]
      }
    ],
  },
  { 
    key: '3',
    title: "Tables", 
    icon: "TableIcon",
    gap: true,
    subMenu: [
      { key: '3-1', title: "Users table", url: "/userTable" },
      { key: '3-2', title: "Row Action Table", url: "/rowActionsTable" },
    ],
  },
]

export const sidebarMenuList1 = [
  { key: 1, title: "Dashboard", icon: "DashboardIcon", url: "/home" },
  { 
    key: 'sub1',
    title: "Admin Setup", 
    icon: "TableIcon",
    gap: true,
    subMenu: [
      { 
        key: 3,
        title: "Users", 
        icon: "TableIcon",
        url: "/userTable"
        // gap: true,
        // subMenu: [
        //   { title: "Users", url: "/userTable" },
        //   { title: "User", url: "/user-details" },
        // ],
      },
      { 
        key: 4,
        title: "System Enablement", 
        icon: "TableIcon",
        url: "/user-details"
        // gap: true,
        // subMenu: [
        //   { title: "Country", url: "/userTable" },
        //   { title: "Currency", url: "/user-details" },
        //   { title: "Language", url: "/user-details" },
        //   { title: "UOM", url: "/home" },
        //   { title: "Time Zone", url: "/user-details" },
        // ],
      },
      { 
        key: 5,
        title: "Licesne Admin", 
        icon: "TableIcon",
        url: "/licence-activation"
      }
    ],
  },
  // { title: "Users", icon: "UsersIcon", url: "/table" },
  // { title: "User", icon: "OneUserIcon", url: "/user" },
  // { title: "User Details", icon: "OneUserIcon", url: "/user-details" },
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
