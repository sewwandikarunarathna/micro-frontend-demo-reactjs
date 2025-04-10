import {
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
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined as DashboardIcon,
  UsergroupAddOutlined as UsersIcon,
  UserOutlined as OneUserIcon,
  MessageOutlined as ChatIcon,
  CalendarOutlined as CalendarIcon,
  TableOutlined as TableIcon,
  CustomerServiceOutlined as SupportIcon,
  SettingOutlined as SettingsIcon,
  LayoutOutlined as AntLayoutIcon,
  LogoutOutlined as LogoutIcon,
  PlusOutlined as AddIcon,
  SaveOutlined as SaveIcon,
  ArrowLeftOutlined as PreviousIcon,
  ArrowRightOutlined as NextIcon,
  DeleteOutlined as DeleteIcon,
  SearchOutlined as SearchIcon,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import PerfectScrollbar from "react-perfect-scrollbar";
import UserDetails from "../components/UserDetails";
import MatTable from "../components/MatTable";
import ActionButtonPopover from "../shared-components/templates/ActionButtonPopover";
import UserSearch from "../shared-components/organisms/UserSearch";
import STUDENTS from "../assets/students.json";
import { divide } from "lodash";
import { ResizableBox } from "react-resizable";

const { Header, Content, Sider } = Layout;

const AntLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchbarCollapsed, setSearchbarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<MenuProps["items"]>([]);
  const [currentUser, setCurrentUser] = useState<any>({
    name: "",
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
    setCurrentUser(userData?.[0]);
  }, [userData]);

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

  const actionButtons = [
    {
      name: "Search",
      icon: <SearchIcon />,
      onclick: () => console.log("Search"),
      disabled: false,
    },
    {
      name: "Add",
      icon: <AddIcon />,
      onclick: () => console.log("Add"),
      disabled: true,
    },
    {
      name: "Save",
      icon: <SaveIcon />,
      onclick: () => console.log("Save"),
      disabled: true,
    },
    {
      name: "Previous",
      icon: <PreviousIcon />,
      onclick: () => console.log("Prev"),
      disabled: true,
    },
    {
      name: "Next",
      icon: <NextIcon />,
      onclick: () => console.log("next"),
      disabled: true,
    },
    {
      name: "Delete",
      icon: <DeleteIcon />,
      onclick: () => console.log("Delete"),
      disabled: true,
    },
  ];

  const iconMap: Record<string, JSX.Element> = {
    DashboardIcon: <DashboardIcon />,
    UsersIcon: <UsersIcon />,
    OneUserIcon: <OneUserIcon />,
    ChatIcon: <ChatIcon />,
    CalendarIcon: <CalendarIcon />,
    TableIcon: <TableIcon />,
    SupportIcon: <SupportIcon />,
    SettingsIcon: <SettingsIcon />,
    AntLayoutIcon: <AntLayoutIcon />,
    LogoutIcon: <LogoutIcon />,
  };

  const getIconComponent = (iconName: keyof typeof iconMap) => {
    if (iconMap[iconName]) {
      return iconMap[iconName];
    }
    // Return a default icon or null if the icon is not found
    return null;
  };

  const onChangeTab = (key: string) => {
    console.log(key);
  };

  const hideSearchPopover = () => {
    setIsSearchOpen(false);
  };

  const searchSingleUser = () => {
    setUserData(
      STUDENTS.filter((std) => std.age == 13).map((user: any, index) => ({
        key: index + 1,
        label: user.name,
        onClick: () => {
          setCurrentUser({
            name: user.name,
            email: user.email,
            firstName: "N/A",
            lastName: "N/A",
            phone: user.phone,
            status: "Active",
          });
        },
      }))
    );
  };

  const sidebarItems: MenuProps["items"] = sidebarMenuList.map(
    (menu, index) => {
      const key = String(index + 1);

      return {
        key: `sub${key}`,
        icon: getIconComponent(menu.icon),
        label: menu.title,
        children: menu.subMenu?.map((subMenu, subIndex) => {
          const subKey = subIndex + 1;
          return {
            key: subKey,
            label: subMenu.title,
          };
        }),
      };
    }
  );

  const navItems: MenuProps["items"] = sideButtonList.map(
    (button: any, index) => ({
      key: index + 1,
      icon: getIconComponent(button.icon),
      label: button.title,
      onClick: () => {
        navigate(button.url);
      },
    })
  );

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
      children: "Content of Company",
    },
    {
      key: "3",
      label: "Authorization",
      children: "Content of Authorization",
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
        <Header className="flex w-full items-center">
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={navItems}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Layout>
          <Sider
            // className="flex flex-col h-screen bg-gray-50"
            trigger={null}
            collapsible
            style={{ background: "#f9fafb" }}
            collapsed={true}
          >
            <Menu
              //   className="flex flex-col h-auto bg-gray-50"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ borderRight: 0, background: "#f9fafb" }}
              items={navItems}
            />
          </Sider>
          <div className="flex flex-col gap-4 h-screen bg-gray-200">
            <Button
              type="text"
              icon={
                sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <PerfectScrollbar
              className=""
              onScrollY={() => console.log("helooo")}
            >
              <Sider
                className="!bg-red-200"
                trigger={null}
                collapsible
                collapsed={sidebarCollapsed}
                collapsedWidth={64}
                width={200}
                breakpoint="lg"
                style={{ background: "#e5e7eb" }}
              >
                <Menu
                  className="flex flex-col h-auto"
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ borderRight: 0, background: "#e5e7eb" }}
                  items={sidebarItems}
                />
              </Sider>
            </PerfectScrollbar>
          </div>
          <Layout>
            <div className="flex-1 w-full flex-col overflow-hidden h-screen p-0 bg-gray-50">
              <div className="h-12 w-full bg-red-100 border-b flex items-center justify-center px-4 gap-8">
                {actionButtons.map((button, index) =>
                  button.name == "Search" ? (
                    <ActionButtonPopover
                      content={
                        <UserSearch
                          onSearchClick={searchSingleUser}
                          onCancelClick={hideSearchPopover}
                        />
                      }
                      title={button.name}
                      open={isSearchOpen}
                      onOpenChange={(newOpen: boolean) =>
                        setIsSearchOpen(newOpen)
                      }
                    >
                      <Button
                        disabled={button.disabled}
                        size="small"
                        type="text"
                        className="text-gray-600 font-bold bg-red-100"
                        onClick={button.onclick}
                        icon={button.icon}
                      ></Button>
                    </ActionButtonPopover>
                  ) : (
                    <Button
                      disabled={button.disabled}
                      size="small"
                      type="text"
                      className="text-gray-600 font-bold bg-red-100"
                      onClick={button.onclick}
                      icon={button.icon}
                    ></Button>
                  )
                )}
              </div>
              <div className="flex-1 flex flex-row w-full bg-gray-50">
                <div className="flex w-auto justify-start items-start">
                  <div className="flex flex-col gap-4 h-screen bg-gray-200 border-l-2 border-gray-400">
                    <Button
                      className="!bg-red-200 w-40 h-40"
                      type="text"
                      icon={
                        searchbarCollapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                      onClick={() => setSearchbarCollapsed(!searchbarCollapsed)}
                    />
                    <Sider
                      className="!bg-gray-200"
                      trigger={null}
                      collapsible
                      collapsed={searchbarCollapsed}
                      collapsedWidth={64}
                      width={siderWidth}
                      breakpoint="lg"
                      style={{ background: "#e5e7eb" }}
                    >
                    <Menu
                        className="flex flex-col h-auto"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ borderRight: 0, background: "#e5e7eb" }}
                        items={userData}
                      />
                    </Sider>
                  </div>
                </div>
                <div
                  className="flex justify-start items-start w-2 h-screen p-0 bg-yellow-400 hover:cursor-col-resize"
                  onMouseDown={handleMouseDown}
                ></div>
                <div className="flex flex-col w-full justify-start items-start p-4 gap-6">
                  {/* <Content
                    style={{
                      padding: 0,
                      margin: 0,
                      minHeight: 280,
                      background: green1,
                      borderRadius: borderRadiusLG,
                    }}
                  > */}
                  <div className="flex flex-row w-full h-auto justify-between items-start py-3">
                    {/* User Panel */}
                    <div className="flex flex-col justify-start w-auto">
                      <h1 className="font-bold text-3xl text-black">User</h1>
                      <h3 className="font-normal text-2xl text-gray-700">
                        {currentUser?.name ?? ""}
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
                    </Form>
                  </div>
                  {/* Tabs section */}
                  <div className="flex flex-row w-full justify-between items-center">
                    <Tabs
                      defaultActiveKey="1"
                      items={tabItems}
                      onChange={onChangeTab}
                    />
                  </div>
                  {/* </Content> */}
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
