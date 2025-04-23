import { MenuProps } from "antd";
import SharedMenu from "../../molecules/SharedMenu";
import SharedSider from "../../organisms/SharedSider";
import SharedButton from "../../atoms/SharedButton";
import AntIcons from "../../../utils/AntIcons";
import PerfectScrollbar from "react-perfect-scrollbar";
import UseFilteredSidebarMenu from "../../../utils/UseFilteredSidebarMenu";
import { useNavigate } from "react-router-dom";
// import { useMenuStore } from "../../../state_management/hooks/menuHooks";
import { useState } from "react";

type Props = {
  sidebarCollapsed: boolean;
  onClick: any;
};
const MainSideBar = (props: Props) => {
  const navigate = useNavigate();
  const [selectedMenuList, setSelectedMenuList] = useState(UseFilteredSidebarMenu());
  const [openKeys, setOpenKeys] = useState(['1']); // Default open submenus
  const [selectedKeys, setSelectedKeys] = useState(['1-1-1']); // Default selected item

   // Recursive function to build menu items
   const buildMenuItems = (items: any): MenuProps['items'] => {
    return items.map((item:any) => {
      const iconComponent = AntIcons(item.icon)();
      const hasChildren = item.subMenu && item.subMenu.length > 0;

      const menuItem = {
        key: item.key,
        icon: iconComponent,
        label: item.title,
        className: item.gap ? 'menu-gap' : '',
        style: { marginBottom: item.gap ? '16px' : '0' },
        // Only add onClick handler if no children
        ...(!hasChildren && {
          onClick: () => {
            if (item.url) {
              navigate(item.url);
            }
          }
        }),
        // Recursively build children if they exist
        ...(hasChildren && { children: buildMenuItems(item.subMenu!) })
      };

      return menuItem;
    });
  };

  const menuItems = buildMenuItems(selectedMenuList);

   // Handle submenu expand/collapse
   const onOpenChange = (keys:string | any) => {
    setOpenKeys(keys);
  };

  // Handle menu item selection
  const onSelect = ({ key }: {key: any}) => {
    setSelectedKeys([key]);
  };
  return (
    <>
      <div className="flex flow-row items-center justify-end w-full">
       
        <SharedButton
          type="text"
          icon={
            props.sidebarCollapsed
              ? AntIcons("MenuUnfoldOutlined")()
              : AntIcons("MenuFoldOutlined")()
          }
          fontSize="16px"
          width={64}
          height={64}
          onClick={props.onClick}
        />
      </div>
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
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            bgColor="#e5e7eb"
            // items={sidebarItems}
            items={menuItems}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            onSelect={onSelect}
          />
        </SharedSider>
      </PerfectScrollbar>
    </>
  );
};

export default MainSideBar;
