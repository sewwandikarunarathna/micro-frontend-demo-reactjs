import { MenuProps } from "antd";
import SharedMenu from "../../molecules/SharedMenu";
import { sideButtonMenuList } from "../../../assets/sidebutton-menu";
import { useNavigate } from "react-router-dom";
import SharedSider from "../../organisms/SharedSider";
import AntIcons from "../../../utils/AntIcons";

const ButtonSideBar = () => {
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
    <SharedSider bgColor="#f9fafb" collapsed={true}>
      <SharedMenu
        // mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        bgColor="#f9fafb"
        items={navItems}
      />
    </SharedSider>
  );
};

export default ButtonSideBar;
