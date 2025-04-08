import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Layout,
  Menu,
  MenuProps,
  Tag,
  theme,
} from "antd";
import React, { JSX, useState } from "react";
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
} from "@ant-design/icons";
import PerfectScrollbar from "react-perfect-scrollbar";

const { Header, Content, Sider } = Layout;

const AntLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [form] = Form.useForm();
  const sideButtonList = sideButtonMenuList;
  const navigate = useNavigate();

  const formData = {
    'userName': 'John D',
    'email': 'johnd@gmail.com',
    'firstName': 'John',
    'lastName': 'Doe',
    'phoneNo': '+94761289043',
    'status': 'Active',
  };
  //   const {
  //     token: { colorBgContainer, borderRadiusLG, green1 },
  //   } = theme.useToken();

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
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
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
                collapsed={collapsed}
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
              <div className="flex-1 flex flex-row w-full bg-gray-50">
                <div className="flex w-auto justify-start items-center">
                  <div className="flex flex-col gap-4 h-screen bg-gray-200 border-l-2 border-gray-400">
                    <Button
                      className="!bg-red-200 w-40 h-40"
                      type="text"
                      icon={
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                      onClick={() => setCollapsed(!collapsed)}
                    />
                    <Sider
                      className="!bg-red-200"
                      trigger={null}
                      collapsible
                      collapsed={collapsed}
                      collapsedWidth={64}
                      width={120}
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
                  </div>
                </div>
                <div className="flex flex-col w-full justify-start items-start flex-1 p-4 gap-6">
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
                    <div className="flex flex-col justify-start w-40">
                      <h1 className="font-bold text-3xl text-black">User Name</h1>
                      <h3 className="font-normal text-2xl text-gray-700">John Doe</h3>
                    </div>
                    <div className="flex justify-end w-60">
                      <Input.Search
                        placeholder="Search here"
                        onSearch={(value) => {
                          //   setGlobalSearchValue(value);
                        }}
                      />
                    </div>
                  </div>
                  {/* User Form */}
                  <div className="flex flex-row w-full justify-center p-2 gap-4 bg-gray-200 rounded-md shadow-md">
                    <Form
                      className="flex flex-row w-full justify-center items-center gap-3"
                      layout={'vertical'}
                      form={form}
                      variant="borderless"
                      size="small"
                      initialValues={{ layout: 'vertical' }}
                    //   onValuesChange={}
                    >
                        {formData && (Object.keys(formData) as Array<keyof typeof formData>).map((data) => (
                            <Form.Item key={data} label={data} className="w-auto">
                                {data == 'status' ? <Tag color="cyan">{formData[data]}</Tag> : 
                                <Input
                                className="text-bold text-sm"
                                placeholder="input placeholder"
                                defaultValue={formData[data]}
                                />}
                            </Form.Item>
                            
                        ))}
                    {/* //   <Form.Item label="E-mail" className="w-auto">
                    //     <Input placeholder="input placeholder" defaultValue={'johnd@gmail.com'} />
                    //   </Form.Item>
                    //   <Form.Item label="firstName" className="w-auto">
                    //     <Input placeholder="input placeholder" defaultValue={'John'} />
                    //   </Form.Item>
                    //   <Form.Item label="lastName" className="w-auto">
                    //     <Input placeholder="input placeholder" defaultValue={'Doe'} />
                    //   </Form.Item>
                    //   <Form.Item label="phoneNo" className="w-auto">
                    //     <Input placeholder="input placeholder" defaultValue={'+94761289043'} />
                    //   </Form.Item>
                    //   <Form.Item label="phoneNo" className="w-auto">
                    //   <Tag color="cyan">{cyan}</Tag>
                    //   </Form.Item> */}
                    </Form>
                  </div>
                  <div className="flex flex-row w-full justify-between items-center"></div>
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
