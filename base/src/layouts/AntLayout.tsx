import {
  Form,
  Layout,
  MenuProps,
} from "antd";
import { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
import STUDENTS from "../assets/students.json";
import MainNavBar from "../shared-components/templates/MainNavBar";
import ButtonSideBar from "../shared-components/templates/ButtonSideBar";
import MainSideBar from "../shared-components/templates/MainSideBar";
import SharedAvatar from "../shared-components/atoms/SharedAvatar";

const AntLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [userData, setUserData] = useState<MenuProps["items"]>([
    { key: '1', label: 'John Doe' },
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
  const [siderWidth, setSiderWidth] = useState(220); // Initial width of the Sider

  useEffect(() => {
  }, [userData]);
  console.log("use dataar", userData);
  console.log("cuenrt user", currentUser);

  useEffect(() => {
    console.log(siderWidth);
  }, [siderWidth]);

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

  return (
    <div>
      <Layout className="h-screen w-full flex flex-col overflow-hidden">
        {/* navbar */}
        <MainNavBar />
        <Layout>
          {/* Buttons sidebar */}
          <ButtonSideBar />
          {/* Main Sidebar */}
          <div className="flex flex-col gap-4 h-screen">
            <MainSideBar sidebarCollapsed={sidebarCollapsed} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} />           
          </div>
          {/* Main Content Area */}
          <Layout>
            <div className="flex-1 w-full flex-col overflow-hidden h-screen p-0">
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
