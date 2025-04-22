import { MenuProps } from "antd";
import SharedMenu from "../../molecules/SharedMenu";
import SharedSider from "../../organisms/SharedSider";
import SharedButton from "../../atoms/SharedButton";
import AntIcons from "../../../utils/AntIcons";
import { sidebarMenuList } from "../../../assets/sidebar-menu";
import PerfectScrollbar from "react-perfect-scrollbar";

type Props = {
  sidebarCollapsed: boolean;
  onClick: any;
}
const MainSideBar = (props:Props) => {
  const sidebarItems: MenuProps["items"] = sidebarMenuList.map(
    (menu, index) => {
      const key = String(index + 1);
      const getIconComponent = AntIcons(menu.icon);
  
        return {
          key: `sub${key}`,
          icon: getIconComponent(),
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
  

  return (
    <>
      <SharedButton
        type="text"
        icon={props.sidebarCollapsed ? AntIcons("MenuUnfoldOutlined")() : AntIcons("MenuFoldOutlined")()}
        fontSize="16px"
        width={64}
        height={64}
        onClick={props.onClick}
      />
      <PerfectScrollbar className="" onScrollY={() => console.log("helooo")}>
        <SharedSider
          className="!bg-red-200"
          collapsed={props.sidebarCollapsed}
          collapsedWidth={64}
          width={200}
          breakpoint="lg"
          bgColor="#e5e7eb"
        >
          <SharedMenu
            className="flex flex-col h-auto"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            bgColor="#e5e7eb"
            items={sidebarItems}
          />
        </SharedSider>
      </PerfectScrollbar>
    </>
  );
};

export default MainSideBar;
