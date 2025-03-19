import React, { JSX, useState } from "react";
import { sidebarMenuList } from "../assets/sidebar-menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRightRounded";
import PerfectScrollbar from 'react-perfect-scrollbar'
import SearchIcon from "@mui/icons-material/Search";
import NotificationIcon from "@mui/icons-material/Notifications";
import SidebarExpandIcon from "@mui/icons-material/ViewSidebarOutlined";
import SidebarCollapseIcon from "@mui/icons-material/HideImage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/HeadsetMic";
import TableIcon from "@mui/icons-material/TableChart";
import 'react-perfect-scrollbar/dist/css/styles.css';

const Layout1 = () => {
  const [isCollapsedMenu, setIsCollapsedMenu] = useState(true);
  const [isCollapsedSearchMenu, setIsCollapsedSearchMenu] = useState(false);
  const [open, setOpen] = useState(true);
  const [subMenus, setSubMenus] = useState<any>({
    calendar: false,
    support: false,
    tables: false,
    analytics: false,
  });

  const Menus = sidebarMenuList;

  const toggleSubMenu = (menu: any) => {
    setSubMenus((prev: any) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleSidebarToggle = () => {
    setIsCollapsedMenu(!isCollapsedMenu);
  };
  const handleSearchMenuToggle = () => {
    setIsCollapsedSearchMenu(!isCollapsedSearchMenu);
  };

  const iconMap: Record<string, JSX.Element> = {
    DashboardIcon: <DashboardIcon />,
    ChatIcon: <ChatIcon />,
    CalendarIcon: <CalendarIcon />,
    TableIcon: <TableIcon />,
    SupportIcon: <SupportIcon />,
    SettingsIcon: <SettingsIcon />,
  };

  const getIconComponent = (iconName: keyof typeof iconMap) => {
    if (iconMap[iconName]) {
      return iconMap[iconName];
    }
    // Return a default icon or null if the icon is not found
    return null;
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <nav className="h-16 bg-gray-800 text-white flex items-center px-4 border-b border-gray-700">
        <div
          className={`cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-500 border-zinc-500 border-2 rounded-full text-xl flex items-center justify-center ${
            !isCollapsedMenu && "rotate-180"
          } transition-all ease-in-out duration-300`}
          onClick={handleSidebarToggle}
        >
          {isCollapsedMenu ? <SidebarExpandIcon /> : <SidebarCollapseIcon />}
        </div>
        <button
          onClick={handleSidebarToggle}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="ml-4 text-xl font-semibold">Dashboard</div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-white transition-all duration-300 ${
            isCollapsedMenu ? "w-1/4" : "w-20"
          }`}
        >
          <div className="p-4 border-b border-gray-700">
            {!isCollapsedMenu ? (
              <span className="text-2xl font-bold">M</span>
            ) : (
              <span className="text-lg font-medium">Menu</span>
            )}
          </div>
          <nav className="p-2 space-y-1 h-3/4">
            <PerfectScrollbar className="" onScrollY={()=>console.log('helooo')}>
            {/* Add your sidebar menu items here */}
            <div className="text-gray-700 font-medium">Users</div>
            <div className="text-gray-700 font-medium">User</div>
            <ul className="pt-6 space-y-0.5">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`flex flex-col rounded-md py-3 px-4 cursor-pointer hover:text-white text-zinc-50 hover:bg-gray-500 transition-all ease-in-out duration-300 ${
                    Menu.gap ? "mt-9" : "mt-2"
                  } ${index === 0 && "bg-gray-500"}`}
                >
                  <div
                    className="flex items-center justify-between gap-x-4"
                    onClick={() => toggleSubMenu(Menu.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getIconComponent(Menu.icon)}
                      </span>
                      <span
                        className={`${
                          !isCollapsedMenu && "hidden"
                        } origin-left ease-in-out duration-300`}
                      >
                        {Menu.title}
                      </span>
                    </div>

                    {Menu.subMenu && (
                      <span
                        className={`ml-auto cursor-pointer text-sm ${
                          subMenus[Menu.key] ? "rotate-360" : ""
                        } transition-transform ease-in-out duration-300 ${
                          !isCollapsedMenu ? "hidden" : ""
                        }`}
                      >
                        {subMenus[Menu.key] ? (
                          <ChevronLeftIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Sidebar submenus NAvbar ITems */}
                  {Menu.subMenu && subMenus[Menu.key] && (
                    <ul className="pl-3 pt-4 text-zinc-300">
                      {Menu.subMenu.map((subMenu, subIndex) => (
                        <li
                          key={subIndex}
                          className="text-sm flex items-center gap-x-2 py-3 px-2 hover:bg-zinc-800 rounded-lg"
                        >
                          <span className="text-zinc-4">
                            <ChevronRightIcon className="text-xs" />
                          </span>
                          {subMenu}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            </PerfectScrollbar>
          </nav>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col overflow-hidden`}>
          {/* Content Horizontal Bar */}
          <div className="h-12 bg-red-100 border-b flex items-center justify-center px-4 gap-4">
            <div className="text-gray-700 font-medium">Add</div>
            <div className="text-gray-700 font-medium">Save</div>
            <div className="text-gray-700 font-medium">Prev</div>
            <div className="text-gray-700 font-medium">Next</div>
            <div className="text-gray-700 font-medium">Delete</div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-hidden p-0 bg-gray-50">
            {/* Your main content here */}
            <div className="h-auto bg-white p-4 rounded shadow">User</div>
            <aside
              className={`bg-gray-200 text-white h-screen transition-all duration-300 ${
                isCollapsedSearchMenu ? "w-20" : "w-1/4"
              }`}
            >
              <div className="p-4 border-b border-gray-700">
                <button
                  onClick={handleSearchMenuToggle}
                  className="p-2 hover:bg-gray-700 rounded"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {isCollapsedSearchMenu ? (
                  <span className="text-2xl font-bold">S</span>
                ) : (
                  <span className="text-lg font-medium">Search</span>
                )}
              </div>
              <nav className="p-2 space-y-1">
                {/* Add your sidebar menu items here */}
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1;
