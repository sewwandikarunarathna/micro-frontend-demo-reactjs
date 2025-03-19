import DashboardIcon from "@mui/icons-material/Dashboard";

export const sidebarMenuList = [
    { "title": "Dashboard", "icon": "DashboardIcon" },
    {
      "title": "Inbox",
      "icon": "ChatIcon",
      "gap": true,
      "subMenu": ["Requested Messages", "Unread Messages", "All Messages"],
      "key": "inbox"
    },
    { "title": "Calendar", "icon": "CalendarIcon" },
    { "title": "Tables", "icon": "TableIcon" },
    { "title": "Support", "icon": "SupportIcon" },
    {
      "title": "Setting",
      "icon": "SettingsIcon",
      "subMenu": ["General", "Security", "Notifications"],
      "key": "settings"
    }
  ]