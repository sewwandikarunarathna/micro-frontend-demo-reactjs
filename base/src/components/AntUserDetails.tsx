import React, { useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  MenuProps,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import STUDENTS from "../assets/students.json";
import SharedAvatar from "../shared-components/atoms/SharedAvatar";
import ActionButtonBar from "../shared-components/templates/ActionButtonBar";
import SearchBar from "../shared-components/templates/SearchBar";
import AuthenticForm from "./AuthenticForm";
import UserForm from "./Form";
import UserGroup from "../modules/user/tab-components/UserGroup";

const AntUserDetails = () => {
  const [siderWidth, setSiderWidth] = useState(200); // Initial width of the Sider
  const [searchbarCollapsed, setSearchbarCollapsed] = useState<boolean>(false);
  const [userData, setUserData] = useState<MenuProps["items"]>([
    { key: "1", label: "John Doe" },
  ]);
  const [currentUser, setCurrentUser] = useState<any>({
    userName: "",
    email: "N/A",
    firstName: "N/A",
    lastName: "N/A",
    phone: "N/A",
    status: "",
  });

  const [form] = Form.useForm();

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "User Groups",
      children: <UserGroup />,
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

  const getInitials = (name: string) => {
    if (!name) return "";
    console.log(
      "short name",
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    );

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
        icon: (
          <SharedAvatar
            style={{
              padding: 0,
              backgroundColor: "#fde3cf",
              color: "#f56a00",
              fontSize: 10,
            }}
            size="small"
            gap={1}
          >
            {getInitials(user.name)}
          </SharedAvatar>
        ),
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

  let isMoving = false;
  let lastX = 0;
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
        if (newWidth < 180) {
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

  const onChangeTab = (key: string) => {
    console.log(key);
  };
  return (
    <>
      {/* Action Buttons Bar */}
      <div className="h-12 w-full bg-red-100 border-b flex items-center justify-center px-4 gap-8">
        <ActionButtonBar onSearchClick={searchSingleUser} />
      </div>
      <div className="flex-1 flex flex-row w-full bg-gray-50">
        {/* Search bar */}
        <SearchBar
          onClick={() => setSearchbarCollapsed(!searchbarCollapsed)}
          searchedData={userData}
          siderWidth={siderWidth}
          onMouseDown={handleMouseDown}
          sidebarCollapsed={searchbarCollapsed}
          setSidebarCollapsed={() => setSearchbarCollapsed(!searchbarCollapsed)}
        />

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
                  Object.keys(currentUser) as Array<keyof typeof currentUser>
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
              defaultActiveKey="1"
              items={tabItems}
              onChange={onChangeTab}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AntUserDetails;
