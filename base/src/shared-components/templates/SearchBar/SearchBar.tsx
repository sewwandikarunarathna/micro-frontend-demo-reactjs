import SharedMenu from "../../molecules/SharedMenu";
import SharedSider from "../../organisms/SharedSider";
import SharedButton from "../../atoms/SharedButton";
import AntIcons from "../../../utils/AntIcons";
import { useState } from "react";
import { MenuProps } from "antd";
import SharedAvatar from "../../atoms/SharedAvatar";

// Custom inline styles
const menuItemStyle = {
  fontSize: "11px",
  padding: "0", // Padding inside menu items
  height: "auto", // Allow items to grow based on content
  lineHeight: "1.5", // Better line height for readability
  display: "flex",
  alignItems: "center", // Center items vertically
  justifyContent: "flex-start", // Align items to the left
};
type Props = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: any;
  onCollapseClick: any;
  siderWidth: number;
  searchedData: any;
  onMouseDown: any;
};
const SearchBar = (props: Props) => {
  const [openKeys, setOpenKeys] = useState(["1"]); // Default open submenus
  const [selectedKeys, setSelectedKeys] = useState(["1"]); // Default selected item

  const getInitials = (name: string) => {
    if (!name) return "";
    console.log(
      "short name",
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    );

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Recursive function to build menu items
  const buildMenuItems = (items: any): MenuProps["items"] => {
    return items.map((item: any) => {
      const menuItem = {
        key: item.key,
        icon: (
          <SharedAvatar
            style={{
              padding: 0,
              backgroundColor: "#fde3cf",
              color: "#f56a00",
              fontSize: 10,
            }}
            size="small"
            gap={1}
          >
            {getInitials(item.label)}
          </SharedAvatar>
        ),
        label: item.label,
        className: item.gap ? "menu-gap" : "",
        style: { marginBottom: item.gap ? "16px" : "0" },
        onClick: item.onClick
      };

      return menuItem;
    });
  };

  const menuItems = buildMenuItems(props.searchedData);

  // Handle submenu expand/collapse
  const onOpenChange = (keys: string | any) => {
    setOpenKeys(keys);
  };

  // Handle menu item selection
  const onSelect = ({ key }: { key: any }) => {
    setSelectedKeys([key]);
  };

  return (
    <>
      <div className="flex w-auto justify-start items-start">
        <div className="flex flex-col gap-4 h-screen bg-gray-200 border-l-2 border-gray-400">
          <SharedButton
            className="!bg-red-200 w-40 h-40"
            type="text"
            icon={
              props.sidebarCollapsed
                ? AntIcons("MenuUnfoldOutlined")()
                : AntIcons("MenuFoldOutlined")()
            }
            onClick={props.onCollapseClick}
          />
          <SharedSider
            className="!bg-gray-200"
            collapsed={props.sidebarCollapsed}
            // onCollapse={getInitials}
            onCollapse={(value: any) => props.setSidebarCollapsed(value)}
            collapsedWidth={44}
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
              items={menuItems}
              openKeys={openKeys}
              selectedKeys={selectedKeys}
              onOpenChange={onOpenChange}
              onSelect={onSelect}
              style={menuItemStyle}
            />
            {/* <Menu mode="inline" defaultSelectedKeys={["1"]}>
              {props.searchedData.map(
                ({ key, label }: { key: string; label: string }) => (
                  <Menu.Item key={key}>
                    {props.sidebarCollapsed ? getInitials1(label) : label}
                    {/* {getInitials(label)} */}

            {/* <SharedMenu
              className="flex flex-col h-auto"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              bgColor="#e5e7eb"
              items={processedItems}
            /> */}
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
