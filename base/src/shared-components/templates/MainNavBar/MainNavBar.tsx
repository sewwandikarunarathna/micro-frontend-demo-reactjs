import { Image, MenuProps } from "antd";
import { JSX } from "react";
import SharedMenu from "../../molecules/SharedMenu";
import { sideButtonMenuList } from "../../../assets/sidebutton-menu";
import { useNavigate } from "react-router-dom";
import SharedHeader from "../../organisms/SharedHeader";
import AntIcons from "../../../utils/AntIcons";
import SharedAvatar from "../../atoms/SharedAvatar";
import SharedButton from "../../atoms/SharedButton";
import Icon, { BellFilled } from "@ant-design/icons";
import SharedBreadCrumb from "../../atoms/SharedBreadCrumb";

const MainNavBar = () => {
  const sideButtonList = sideButtonMenuList;
  const navigate = useNavigate();

  const breadcrumbItems = [
    {
      title: "Home",
    },
    {
      title: <a href="/">Users</a>,
    },
    {
      title: <a href="/user-details">User</a>,
    },
    {
      title: "User",
    },
  ];

  const navItems: MenuProps["items"] = sideButtonList.map(
    (button: any, index) => {
      const getIconComponent = AntIcons(button.icon);
      return {
        key: index + 1,
        icon: getIconComponent(),
        label: button.title,
        onClick: () => {
          navigate(button.url);
        },
      };
    }
  );

  return (
    <div className="flex w-full justify-between items-center bg-gray-100 border-2 border-gray-300 shadow-sm">
      <div className="flex justify-start items-center gap-2 px-4 py-2">
        <SharedBreadCrumb
          items={breadcrumbItems}
          className="text-sm text-red-400"
        />
      </div>
      <div className="flex flex-row justify-end items-center gap-2 px-4 py-2">
        <SharedButton
          type="text"
          size="small"
          className="text-sm text-blue-600 font-bold mr-4"
        >
          ABC Ltd
        </SharedButton>
        <Icon
          className="hover:cursor-pointer hover:bg-gray-300 rounded-full p-2"
          onClick={() => console.log("icon clicked")}
          component={BellFilled}
        />
        <SharedButton
          type="text"
          icon={AntIcons("InfoCircleOutlined")()}
        ></SharedButton>
        <Image
          className="rounded-full hover:cursor-pointer"
          onClick={() => console.log("image clicked")}
          width={30}
          preview={false}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      {/* <SharedHeader className="bg-yellow-300">
      sewanwweewe */}
      {/* <SharedMenu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={navItems}
        style={{ flex: 1, minWidth: 0 }}
      /> */}
      {/* </SharedHeader> */}
    </div>
  );
};

export default MainNavBar;
