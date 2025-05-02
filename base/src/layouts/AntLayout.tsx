import {
  Layout,
} from "antd";
import { useState } from "react";
import { Outlet} from "react-router-dom";
import MainNavBar from "../shared-components/templates/MainNavBar";
import ButtonSideBar from "../shared-components/templates/ButtonSideBar";
import MainSideBar from "../shared-components/templates/MainSideBar";

const AntLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

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
