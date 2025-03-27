import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRightRounded";
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
import { AuthProvider } from "../context/AuthContext";
import AppRoutes from "../routes/AppRoutes";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const [subMenus, setSubMenus] = useState<any>({
    calendar: false,
    support: false,
    tables: false,
    analytics: false,
  });

  const toggleSubMenu = (menu: any) => {
    setSubMenus((prev: any) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const Menus = [
    { title: "Dashboard", icon: <DashboardIcon /> },
    {
      title: "Inbox",
      icon: <ChatIcon />,
      gap: true,
      subMenu: ["Requested Messages", "Unread Messages", "All Messages"],
      key: "inbox",
    },
    { title: "Calendar", icon: <CalendarIcon /> },
    { title: "Tables", icon: <TableIcon /> },
    //   { title: "Analytics", icon: <GoGraph /> },
    { title: "Support", icon: <SupportIcon /> },
    {
      title: "Setting",
      icon: <SettingsIcon />,
      subMenu: ["General", "Security", "Notifications"],
      key: "settings",
    },
  ];
  return (
    // <div className="flex w-full h-full gap-14">
    //   <Navbar />
    // </div>
    <div className="w-full flex flex-col h-full">
      {/* <div className="flex flex-col gap-10"> */}
      {/* Navbar section */}
      <div className="w-full h-[8ch] px-12 bg-zinc-50 shadow-md flex items-center justify-between top-0 fixed">
        <div className="w-96 border border-zinc-300 rounded-full h-11 flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 h-full rounded-full outline-none border-none bg-zinc-50 px-4"
          />

          <button className="px-4 h-full flex items-center justify-center text-base text-zinc-600 border-l border-zinc-300">
            <SearchIcon />
          </button>
        </div>

        <div className="flex items-center gap-x-8">
          {/* Notification */}
          <button className="relative">
            <div className="w-5 h-5 bg-zinc-50 flex items-center justify-center absolute -top-1.5 -right-2.5 rounded-full p-0.5">
              <span className="bg-red-600 text-white rounded-full w-full h-full flex items-center justify-center text-xs">
                3
              </span>
            </div>
            <NotificationIcon className="text-xl" />
          </button>

          {/* Profile img */}
          <img
            src="https://cdn.pixabay.com/photo/2016/11/21/11/17/model-1844729_640.jpg"
            alt="profile img"
            className="w-11 h-11 rounded-full object-cover object-center cursor-pointer"
          />
        </div>
      </div>
      {/* </div> */}
      <div className="flex flex-row justify-between items-start w-full">
        {/* Sidebar section */}
        <div
          className={`${
            open ? "w-72 p-5" : "w-20 p-4"
          } flex flex-col items-start justify-start bg-zinc-900 h-screen pt-8 mt-24 duration-300 ease-in-out fixed`}
        >
          {/* Toggle button sections */}
          <div
            className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${
              !open && "rotate-180"
            } transition-all ease-in-out duration-300`}
            onClick={() => setOpen(!open)}
          >
            {open ? <SidebarExpandIcon /> : <SidebarCollapseIcon />}
          </div>

          {/* Logo and title section */}
          <div className="flex gap-x-4 items-center">
            <img
              src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_640.png"
              alt="logo"
              className={`w-10 h-10 rounded-full object-cover object-center cursor-pointer ease-in-out duration-3 ${
                open && "rotate-[360deg]"
              }`}
            />

            <h1
              className={`text-zinc-50 origin-left font-semibold text-xl duration-200 ease-in-out ${
                !open && "scale-0"
              }`}
            >
              Admin Dashboard
            </h1>
          </div>

          {/* Sidebar Navbar Items section */}
          <ul className="pt-6 space-y-0.5">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex flex-col rounded-md py-3 px-4 cursor-pointer hover:text-white text-zinc-50 hover:bg-zinc-800/50 transition-all ease-in-out duration-300 ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${index === 0 && "bg-zinc-800/40"}`}
              >
                <div
                  className="flex items-center justify-between gap-x-4"
                  onClick={() => toggleSubMenu(Menu.key)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{Menu.icon}</span>
                    <span
                      className={`${
                        !open && "hidden"
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
                        !open ? "hidden" : ""
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
        </div>

        {/* Dashboard contents */}
        <div className="flex items-center justify-end w-2/3 px-12">
          <h1 className="text-xl text-zinc-800 font-medium">
            This is the Dashboard page. This is the Dashboard page.This is the
            Dashboard page.This is the Dashboard page.This is the Dashboard
            page.This is the Dashboard page.
          </h1>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </div>
      </div>
      {/* Dashboard Layout section */}
      {/* <div className="h-screen flex-1 bg-zinc-100 space-y-6">
      </div> */}
    </div>
  );
};

export default Layout;
