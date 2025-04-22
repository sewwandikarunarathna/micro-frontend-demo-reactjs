import {
  Avatar,
  Breadcrumb,
  Button,
  Form,
  Input,
  Layout,
  Menu,
  MenuProps,
  Tabs,
  TabsProps,
  Tag,
  theme,
} from "antd";
import React, { JSX, useEffect, useState } from "react";
import { sideButtonMenuList } from "../assets/sidebutton-menu";
import { sidebarMenuList } from "../assets/sidebar-menu";
import { Outlet, useNavigate } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import ActionButtonPopover from "../shared-components/templates/ActionButtonPopover";
import UserSearch from "../shared-components/organisms/UserSearch";
import STUDENTS from "../assets/students.json";
import { divide } from "lodash";
import { ResizableBox } from "react-resizable";
import UserForm from "../components/Form";
import AuthenticForm from "../components/AuthenticForm";
import SharedMenu from "../shared-components/molecules/SharedMenu";
import SharedSider from "../shared-components/organisms/SharedSider";
import SharedButton from "../shared-components/atoms/SharedButton";
import MainNavBar from "../shared-components/templates/MainNavBar";
import ButtonSideBar from "../shared-components/templates/ButtonSideBar";
import MainSideBar from "../shared-components/templates/MainSideBar";
import ActionButtonBar from "../shared-components/templates/ActionButtonBar";
import SearchBar from "../shared-components/templates/SearchBar";
import AntIcons from "../utils/AntIcons";
import SharedAvatar from "../shared-components/atoms/SharedAvatar";

const { Header } = Layout;

const AntLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchbarCollapsed, setSearchbarCollapsed] = useState<boolean>(false);
  const [userData, setUserData] = useState<MenuProps["items"]>([
    { key: '1', label: 'John Doe' },
  ]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({
    userName: "",
    email: "N/A",
    firstName: "N/A",
    lastName: "N/A",
    phone: "N/A",
    status: "",
  });

  const [form] = Form.useForm();
  const sideButtonList = sideButtonMenuList;
  const navigate = useNavigate();
  const [siderWidth, setSiderWidth] = useState(220); // Initial width of the Sider

  useEffect(() => {
    // setCurrentUser(userData?.[0]);
  }, [userData]);
  console.log("use dataar", userData);
  console.log("cuenrt user", currentUser);

  let isMoving = false;
  let lastX = 0;

  useEffect(() => {
    console.log(siderWidth);
  }, [siderWidth]);

  const handleMouseDown = (e: any) => {
    console.log("mouse down");
    isMoving = true;
    lastX = e.clientX;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMoving) return;

      const deltaX = e.clientX - lastX;
      setSiderWidth((width) => {
        const newWidth = width + deltaX;

        // Enforce min and max width
        if (newWidth < 200) {
          console.log("Reached minimum width");
          return 200;
        }
        if (newWidth > 400) {
          console.log("Reached maximum width");
          return 400;
        }

        console.log(`width: ${newWidth}, delta: ${deltaX}`);
        return newWidth;
      });

      lastX = e.clientX;
    };


    const handleMouseUp = () => {
      console.log("mouse up");
      isMoving = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // Attach event listeners for mousemove and mouseup
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const formData = {
    userName: "John D",
    email: "johnd@gmail.com",
    firstName: "John",
    lastName: "Doe",
    phoneNo: "+94761289043",
    status: "Active",
  };
  //   const {
  //     token: { colorBgContainer, borderRadiusLG, green1 },
  //   } = theme.useToken();




  // const getIconComponent = (iconName: keyof typeof iconMap) => {
  //   if (iconMap[iconName]) {
  //     return iconMap[iconName];
  //   }
  //   // Return a default icon or null if the icon is not found
  //   return null;
  // };

  const onChangeTab = (key: string) => {
    console.log(key);
  };

 const handleOpenChange = (newOpen: boolean) => {
    // setIsSearchOpen(newOpen);
    setIsSearchOpen(!isSearchOpen);
  };

   // const getInitials = (name: string) => {
    const getInitials = (name:string) => {
  
      if (!name) return "";
      console.log('short name', name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase());
      
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    };

  const searchSingleUser = () => {
    setUserData(
      STUDENTS.filter((std) => std.age == 13).map((user: any, index) => ({
        key: index + 1,
        label: user.name,
        icon: <SharedAvatar style={{ padding: 0, backgroundColor: '#fde3cf', color: '#f56a00', fontSize: 10 }} size="small" gap={1}>{getInitials(user.name)}</SharedAvatar>,
        onClick: () => {
          form.setFieldsValue({
            userName: user.name,
            email: user.email,
            firstName: "N/A",
            lastName: "N/A",
            phoneNo: user.phone,
            status: "Active",
          });
          setCurrentUser({
            userName: user.name,
            email: user.email,
            firstName: "N/A",
            lastName: "N/A",
            phoneNo: user.phone,
            status: "Active",
          });
        },
      }))
    );
  };

  // const sidebarItems: MenuProps["items"] = sidebarMenuList.map(
  //   (menu, index) => {
  //     const key = String(index + 1);

  //     return {
  //       key: `sub${key}`,
  //       icon: getIconComponent(menu.icon),
  //       label: menu.title,
  //       children: menu.subMenu?.map((subMenu, subIndex) => {
  //         const subKey = subIndex + 1;
  //         return {
  //           key: subKey,
  //           label: subMenu.title,
  //         };
  //       }),
  //     };
  //   }
  // );

  // const navItems: MenuProps["items"] = sideButtonList.map(
  //   (button: any, index) => ({
  //     key: index + 1,
  //     icon: getIconComponent(button.icon),
  //     label: button.title,
  //     onClick: () => {
  //       navigate(button.url);
  //     },
  //   })
  // );

  // const userData: MenuProps["items"] = ;


  return (
    <div>
      <Layout className="h-screen w-full flex flex-col overflow-hidden">
        {/* navbar */}
        <MainNavBar />
        <Layout>
          {/* Buttons sidebar */}
          <ButtonSideBar />
          {/* Main Sidebar */}
          <div className="flex flex-col gap-4 h-screen bg-gray-200">
            <MainSideBar sidebarCollapsed={sidebarCollapsed} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} />           
          </div>
          {/* Main Content Area */}
          <Layout>
            <div className="flex-1 w-full flex-col overflow-hidden h-screen p-0 bg-gray-50">
             <Outlet />
            </div>
          </Layout>
          {/* End of Main Content Area */}
        </Layout>
      </Layout>
    </div>
  );
};

export default AntLayout;
