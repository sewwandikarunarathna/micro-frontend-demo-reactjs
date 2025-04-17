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
  siderWidth: number;
  searchedData: any;
  onMouseDown: any;
};
const SearchBar = (props: Props) => {
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
      <div className="flex w-auto justify-start items-start">
        <div className="flex flex-col gap-4 h-screen bg-gray-200 border-l-2 border-gray-400">
          <SharedButton
            className="!bg-red-200 w-40 h-40"
            type="text"
            icon={props.sidebarCollapsed ? AntIcons("MenuUnfoldOutlined")() : AntIcons("MenuFoldOutlined")()}
            onClick={props.onClick}
          />
          <SharedSider
            className="!bg-gray-200"
            collapsed={props.sidebarCollapsed}
            collapsedWidth={64}
            width={props.siderWidth}
            breakpoint="lg"
            bgColor="#e5e7eb"
          >
            <SharedMenu
              className="flex flex-col h-auto"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              bgColor="#e5e7eb"
              items={props.searchedData}
            />
          </SharedSider>
        </div>
      </div>
      <div
        className="flex justify-start items-start w-2 h-screen p-0 bg-yellow-400 hover:cursor-col-resize"
        onMouseDown={props.onMouseDown}
      ></div>
    </>
  );
};

export default SearchBar;
