import { useEffect, useState } from "react";
import {
  Form,
  Input,
  MenuProps,
  Tabs,
  TabsProps,
} from "antd";
import STUDENTS from "../assets/students.json";
import ActionButtonBar from "../shared-components/templates/ActionButtonBar";
import SearchBar from "../shared-components/templates/SearchBar";
import SharedTypography from "../shared-components/atoms/SharedTypography";
import SharedTag from "../shared-components/atoms/SharedTag";
import UserGroups from "../modules/user/tab-components/UserGroups";
import Branch from "../modules/user/tab-components/Branch";
import AuthorizationTab from "../modules/user/tab-components/AuthorizationTab";
import SettingsTab from "../modules/user/tab-components/SettingsTab";

const AntUserDetails = () => {
  const [siderWidth, setSiderWidth] = useState(180); // Initial width of the Sider
  const [searchbarCollapsed, setSearchbarCollapsed] = useState<boolean>(false);
  const [userData, setUserData] = useState<MenuProps["items"]>([
    { key: "1", label: "John Doe" },
  ]);
  const [currentUser, setCurrentUser] = useState<any>({
    userName: "John Doe",
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
      children: <UserGroups />,
    },
    {
      key: "2",
      label: "Branch",
      children: <Branch />,
    },
    {
      key: "3",
      label: "Authorization",
      children: <AuthorizationTab />,
    },
    {
      key: "4",
      label: "Settings",
      children: <SettingsTab />,
    },
  ];

  useEffect(()=>{
   
  }, [userData, form]);

  const searchSingleUser = () => {
    const filteredStudents = STUDENTS.filter((std) => std.age == 13);
    //set first user as current user in the form
    setCurrentUser({
      userName: filteredStudents[0].name,
      email: filteredStudents[0].email,
      firstName: "N/A",
      lastName: "N/A",
      phoneNo: filteredStudents[0].phone,
      status: "Active",
    });
    setUserData(
      filteredStudents.map((user: any, index) => ({
        key: index + 1,
        label: user.name,
        onClick: () => {         
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
        if (newWidth < 160) {
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
      <div className="h-12 w-full bg-white border-b-2 border-gray-300 flex items-center justify-center px-4 gap-8">
        <ActionButtonBar onSearchClick={searchSingleUser} />
      </div>
      <div className="flex-1 flex flex-row w-full">
        {/* Search bar */}
        <SearchBar
          onCollapseClick={() => setSearchbarCollapsed(!searchbarCollapsed)}
          searchedData={userData}
          siderWidth={siderWidth}
          onMouseDown={handleMouseDown}
          sidebarCollapsed={searchbarCollapsed}
          setSidebarCollapsed={() => setSearchbarCollapsed(!searchbarCollapsed)}
        />

        {/* Main Content */}
        <div className="flex flex-col w-full justify-start items-start p-4 gap-6">
          <div className="flex flex-row w-full h-13 justify-between items-start my-3">
            {/* User Panel */}
            <div className="flex flex-col justify-start w-auto">
              <SharedTypography isTitle={true} level={3} className="font-bold text-2xl text-black">User</SharedTypography>
              <SharedTypography isTitle={true} level={4} className="font-normal !text-gray-700 !m-0">
                {currentUser?.userName ?? "John Doe"}
              </SharedTypography>
            </div>
          </div>
          {/* User Form */}
          <div className="flex flex-row w-full h-auto justify-center items-center p-1 gap-4 bg-gray-200 rounded-md shadow-md">
            <Form
              className="flex flex-row w-full justify-center items-center gap-3"
              layout={"vertical"}
              form={form}
              variant="borderless"
              size="small"
              initialValues={{ layout: "vertical" }}
              onFinish={async (values) => {
                // Convert AntD values to FormData
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                  formData.append(key, value as string);
                });
                // submitAction(formData);
              }}
            >
              {/* {currentUser &&
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
                ))} */}
              {/* {!currentUser && <div className="w-full h-24"></div>} */}
              <Form.Item
                        key="userName"
                        label="User Name"
                        className="w-auto"
                      >
                        <Input
                          className="text-bold text-sm"
                          placeholder="userName"
                          defaultValue={currentUser?.userName}
                          // value={currentUser?.userName}
                        />
                      </Form.Item>
                      <Form.Item key="email" label="E-mail" className="w-auto">
                        <Input
                          className="text-bold text-sm"
                          placeholder="email"
                          defaultValue={currentUser?.email}
                          value={currentUser?.email}
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
                          value={currentUser?.phoneNo}
                        />
                      </Form.Item>
                      <Form.Item key="status" label="status" className="w-auto">
                      <SharedTag color="cyan">{currentUser?.status}</SharedTag>
                        {/* <Input
                          className="text-bold text-sm"
                          placeholder="status"
                          defaultValue={currentUser?.status}
                          value={currentUser?.status}
                        /> */}
                      </Form.Item>
            </Form>
          </div>
          {/* Tabs section */}
          <div className="flex flex-row w-full justify-start items-center">
            <Tabs
            className="w-full"
              defaultActiveKey="1"
              items={tabItems}
              onChange={onChangeTab}
              // style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AntUserDetails;
