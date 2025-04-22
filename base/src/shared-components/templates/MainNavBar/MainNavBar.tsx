import { MenuProps } from "antd";
import { JSX } from "react";
import SharedMenu from "../../molecules/SharedMenu";
import { sideButtonMenuList } from "../../../assets/sidebutton-menu";
import { useNavigate } from "react-router-dom";
import SharedHeader from "../../organisms/SharedHeader";
import AntIcons from "../../../utils/AntIcons";

const MainNavBar = () => {
  const sideButtonList = sideButtonMenuList;
  const navigate = useNavigate();

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
    <SharedHeader className="flex w-full items-center">
      <div className="demo-logo" />
      <SharedMenu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={navItems}
        style={{ flex: 1, minWidth: 0 }}
      />
    </SharedHeader>
  );
};

export default MainNavBar;
