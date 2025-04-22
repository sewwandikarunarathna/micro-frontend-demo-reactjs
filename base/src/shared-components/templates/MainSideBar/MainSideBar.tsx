import { MenuProps } from "antd";
import SharedMenu from "../../molecules/SharedMenu";
import SharedSider from "../../organisms/SharedSider";
import SharedButton from "../../atoms/SharedButton";
import AntIcons from "../../../utils/AntIcons";
import PerfectScrollbar from "react-perfect-scrollbar";
import UseFilteredSidebarMenu from "../../../utils/UseFilteredSidebarMenu";
import { useNavigate } from "react-router-dom";
import SharedSelect from "../../atoms/SharedSelect";
// import { useMenuStore } from "../../../state_management/hooks/menuHooks";
import { sideBarMenuTypesList } from "../../../assets/menu-type";
import { useEffect, useState } from "react";
import { useMenuStore } from "base/MenuStore";

type Props = {
  sidebarCollapsed: boolean;
  onClick: any;
};
const MainSideBar = (props: Props) => {
  const navigate = useNavigate();
  const { updateMenu, menuList } = useMenuStore();
  const [selectedMenuList, setSelectedMenuList] = useState(UseFilteredSidebarMenu());

  useEffect(() => {
    console.log("use efiect:", menuList);
    // setSelectedMenuList(UseFilteredSidebarMenu())
    setSelectedMenuList(menuList)
  }, [useMenuStore()]);

  const sidebarItems: MenuProps["items"] = selectedMenuList?.map(
    (menu: any, index: number) => {
      const key = String(index + 1);
      const getIconComponent = AntIcons(menu.icon);

      return {
        key: `sub${key}`,
        icon: getIconComponent(),
        label: menu.title,
        onClick: () => {
          navigate(menu.url);
        },
        children: menu.subMenu?.map((subMenu: any, subIndex: number) => {
          const subKey = subIndex + 1;
          return {
            key: subKey,
            label: subMenu.title,
            onClick: () => {
              navigate(subMenu.url);
            },
          };
        }),
      };
    }
  );

  const handleMenuTypeChange = (value: any) => {
    // console.log('selected value:', value);
    const selectedMenu = sideBarMenuTypesList.find(
      (menu) => menu.title === value
    );
    updateMenu(selectedMenu?.menuList);
    // setSelectedMenuList(UseFilteredSidebarMenu());
  };
  console.log("menu list fro select:", menuList);
  console.log(" selected menu lis:", selectedMenuList);
  console.log(
    " UseFilteredSidebarMenu(menuList):",
    UseFilteredSidebarMenu()
  );

  return (
    <>
      <div className="flex flow-row gap-2 items-center justify-center w-full h-8 bg-white shadow-md">
        <SharedSelect
          defaultValue={sideBarMenuTypesList[0]}
          style={{ width: 120 }}
          onChange={handleMenuTypeChange}
          options={sideBarMenuTypesList.map((menuType) => ({
            label: menuType.title,
            value: menuType.title,
          }))}
        />
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
