import React, { JSX, useState } from "react";
import { sidebarMenuList } from "../assets/sidebar-menu";
import DownIcon from "@mui/icons-material/ArrowDownwardRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRightRounded";
import PerfectScrollbar from "react-perfect-scrollbar";
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
import UsersIcon from "@mui/icons-material/People";
import OneUserIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviousIcon from "@mui/icons-material/SkipPrevious";
import NextIcon from "@mui/icons-material/SkipNext";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AppRoutes from "../routes/AppRoutes";

const Layout1 = () => {
  const [isCollapsedMenu, setIsCollapsedMenu] = useState(true);
  const [open, setOpen] = useState(true);
  const [clickedMenuIndex, setClickedMenuIndex] = useState(0);
  const [clickedSubMenuIndex, setClickedSubMenuIndex] = useState(0);
  const [subMenus, setSubMenus] = useState<any>({
    calendar: false,
    support: false,
    tables: false,
    analytics: false,
  });

  const navigate = useNavigate();

  const Menus = sidebarMenuList;

  const onClickMenuItem = (menu: any, index: number) => {
    setClickedMenuIndex(index);
    if (menu.subMenu) {
      setSubMenus((prev: any) => ({
        ...prev,
        [menu.key]: !prev[menu.key],
      }));
      console.log("sewww", subMenus);
      // navigate(menu.subMenu.url);
    } else {
      navigate(menu.url);
    }
  };

  const onClickSubMenuItem = (subMenu: any, subIndex: number) => {
    setClickedSubMenuIndex(subIndex);
    navigate(subMenu.url);

  }

  const handleSidebarToggle = () => {
    setIsCollapsedMenu(!isCollapsedMenu);
  };

  const iconMap: Record<string, JSX.Element> = {
    DashboardIcon: <DashboardIcon />,
    UsersIcon: <UsersIcon />,
    OneUserIcon: <OneUserIcon />,
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
      <nav className=" bg-gray-800 text-white flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex items-center justify-start gap-1">
          <div
            className={`cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-500 border-zinc-500 border-2 rounded-full text-xl flex items-center justify-center ${
              !isCollapsedMenu && "rotate-180"
            } transition-all ease-in-out duration-300`}
            onClick={handleSidebarToggle}
          >
            {isCollapsedMenu ? <SidebarExpandIcon /> : <SidebarCollapseIcon />}
          </div>
          {/* <button
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
          </button> */}
          <div className="ml-4 text-xl font-semibold">Dashboard</div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <span>ABC Ltd</span>
          <NotificationIcon className="text-xl" />
        </div>
      </nav>

      <div className="flex flex-1">
        {/* SideButtonsbar */}
        <aside
          className={"bg-gray-300 text-black transition-all duration-300 w-16"}
        >
          <nav className="p-2 space-y-1">
            {/* Add your sidebar button items here */}
            <ul className="pt-6 space-y-0.5">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={
                    "flex flex-col rounded-md py-3 px-4 mt-2 cursor-pointer hover:text-white text-zinc-50 hover:bg-gray-500 transition-all ease-in-out duration-300"
                  }
                >
                  <div
                    className="flex items-center justify-between gap-x-4"
                    // onClick={() => onClickMenuItem(Menu.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getIconComponent(Menu.icon)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
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
            <PerfectScrollbar
              className=""
              onScrollY={() => console.log("helooo")}
            >
              {/* Add your sidebar menu items here */}
              <ul className="pt-6 space-y-0.5">
                {Menus.map((Menu, index) => (
                  <li
                    key={index}
                    className={`flex flex-col rounded-md py-3 px-4 cursor-pointer hover:text-white text-zinc-50 hover:bg-gray-500 transition-all ease-in-out duration-300 ${
                      Menu.gap ? "mt-9" : "mt-2"
                    } ${index === clickedMenuIndex && "bg-gray-500"}`}
                  >
                    <div
                      className="flex items-center justify-between gap-x-4"
                      onClick={() => onClickMenuItem(Menu, index)}
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
                            <DownIcon />
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
                            className={`text-sm flex items-center gap-x-2 py-3 px-2 hover:bg-zinc-800 rounded-lg ${subIndex === clickedMenuIndex && "bg-zinc-500"}`}
                            onClick={() => onClickSubMenuItem(subMenu, subIndex)}
                          >
                            <span className="text-zinc-4">
                              <ChevronRightIcon className="text-xs" />
                            </span>
                            {subMenu.title}
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
            <div className="text-gray-700 font-medium">
              <AddIcon />
            </div>
            <div className="text-gray-700 font-medium">
              <SaveIcon />
            </div>
            <div className="text-gray-700 font-medium">
              <PreviousIcon />
            </div>
            <div className="text-gray-700 font-medium">
              <NextIcon />
            </div>
            <div className="text-gray-700 font-medium">
              <DeleteIcon />
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-hidden p-0 bg-gray-50">
            {/* Your main content here */}
            {/* <AuthProvider>
              <AppRoutes />
            </AuthProvider> */}
             <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1;
