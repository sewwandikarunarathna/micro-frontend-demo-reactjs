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
import { useNavigate } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import MatTable from "../components/MatTable";
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

  const actionButtons = [
    {
      name: "Search",
      icon: AntIcons("SearchIcon")(),
      onclick: () => console.log("Search"),
      disabled: false,
    },
    {
      name: "Add",
      icon: AntIcons("AddIcon")(),
      onclick: () => console.log("Add"),
      disabled: true,
    },
    {
      name: "Save",
      icon: AntIcons("SaveIcon")(),
      onclick: () => console.log("Save"),
      disabled: true,
    },
    {
      name: "Previous",
      icon: AntIcons("PreviousIcon")(),
      onclick: () => console.log("Prev"),
      disabled: true,
    },
    {
      name: "Next",
      icon: AntIcons("NextIcon")(),
      onclick: () => console.log("next"),
      disabled: true,
    },
    {
      name: "Delete",
      icon: AntIcons("DeleteIcon")(),
      onclick: () => console.log("Delete"),
      disabled: true,
    },
  ];
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

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "User Groups",
      children: <MatTable />,
    },
    {
      key: "2",
      label: "Company",
      children: <UserForm />,
    },
    {
      key: "3",
      label: "Authorization",
      children: <AuthenticForm />,
    },
    {
      key: "4",
      label: "Settings",
      children: "Content of Settings",
    },
  ];

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
          <Layout>
            <div className="flex-1 w-full flex-col overflow-hidden h-screen p-0 bg-gray-50">
              {/* Action Buttons Bar */}
              <div className="h-12 w-full bg-red-100 border-b flex items-center justify-center px-4 gap-8">
                <ActionButtonBar onSearchClick={searchSingleUser} />
   
              </div>
              <div className="flex-1 flex flex-row w-full bg-gray-50">
                {/* Search bar */}
                <SearchBar onClick={() => setSearchbarCollapsed(!searchbarCollapsed)} searchedData={userData} siderWidth={siderWidth} onMouseDown={handleMouseDown} sidebarCollapsed={searchbarCollapsed} setSidebarCollapsed={() => setSearchbarCollapsed(!searchbarCollapsed)} />               

                {/* Main Content */}
                <div className="flex flex-col w-full justify-start items-start p-4 gap-6">
                  <div className="flex flex-row w-full h-auto justify-between items-start py-3">
                    {/* User Panel */}
                    <div className="flex flex-col justify-start w-auto">
                      <h1 className="font-bold text-3xl text-black">User</h1>
                      <h3 className="font-normal text-2xl text-gray-700">
                        {currentUser?.userName ?? ""}
                      </h3>
                    </div>
                  </div>
                  {/* User Form */}
                  <div className="flex flex-row w-full justify-center p-2 gap-4 bg-gray-200 rounded-md shadow-md">
                    <Form
                      className="flex flex-row w-full justify-center items-center gap-3"
                      layout={"vertical"}
                      form={form}
                      variant="borderless"
                      size="small"
                      initialValues={{ layout: "vertical" }}
                      //   onValuesChange={}
                    >
                      {currentUser &&
                        (
                          Object.keys(currentUser) as Array<
                            keyof typeof currentUser
                          >
                        ).map((data: any) => (
                          <Form.Item key={data} label={data} className="w-auto">
                            {data == "status" ? (
                              <Tag color="cyan">{currentUser[data]}</Tag>
                            ) : (
                              <Input
                                className="text-bold text-sm"
                                placeholder={data}
                                defaultValue={currentUser[data]}
                              />
                            )}
                          </Form.Item>
                        ))}
                      {/* {!currentUser && <div className="w-full h-24"></div>} */}
                      {/* <Form.Item
                        key="userName"
                        label="User Name"
                        className="w-auto"
                      >
                        <Input
                          className="text-bold text-sm"
                          placeholder="userName"
                          defaultValue={currentUser?.userName}
                          value={currentUser?.userName}
                        />
                      </Form.Item>
                      <Form.Item key="email" label="E-mail" className="w-auto">
                        <Input
                          className="text-bold text-sm"
                          placeholder="email"
                          defaultValue={currentUser?.email}
                        />
                      </Form.Item>
                      <Form.Item
                        key="firstName"
                        label="First Name"
                        className="w-auto"
                      >
                        <Input
                          className="text-bold text-sm"
                          placeholder="first name"
                          defaultValue={currentUser?.firstName}
                        />
                      </Form.Item>
                      <Form.Item
                        key="lastName"
                        label="Last Name"
                        className="w-auto"
                      >
                        <Input
                          className="text-bold text-sm"
                          placeholder="lastName"
                          defaultValue={currentUser?.lastName}
                        />
                      </Form.Item>
                      <Form.Item
                        key="phoneNo"
                        label="phone No"
                        className="w-auto"
                      >
                        <Input
                          className="text-bold text-sm"
                          placeholder="phoneNo"
                          defaultValue={currentUser?.phoneNo}
                        />
                      </Form.Item>
                      <Form.Item key="status" label="status" className="w-auto">
                        <Input
                          className="text-bold text-sm"
                          placeholder="status"
                          defaultValue={currentUser?.status}
                        />
                      </Form.Item> */}
                    </Form>
                  </div>
                  {/* Tabs section */}
                  <div className="flex flex-row w-full justify-start items-center">
                    <Tabs
                      defaultActiveKey="3"
                      items={tabItems}
                      onChange={onChangeTab}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default AntLayout;
