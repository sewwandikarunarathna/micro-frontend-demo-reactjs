import SharedMenu from "../../molecules/SharedMenu";
import SharedSider from "../../organisms/SharedSider";
import SharedButton from "../../atoms/SharedButton";
import AntIcons from "../../../utils/AntIcons";

  // Custom inline styles
  const menuItemStyle = {
    fontSize: '11px',
    padding: '0',     // Padding inside menu items
    height: 'auto',           // Allow items to grow based on content
    lineHeight: '1.5',        // Better line height for readability
    display: 'flex',
    alignItems: 'center',     // Center items vertically
    justifyContent: 'flex-start', // Align items to the left
  };
type Props = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: any;
  onClick: any;
  siderWidth: number;
  searchedData: any;
  onMouseDown: any;
};
const SearchBar = (props: Props) => {
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
            onClick={props.onClick}
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
              items={props.searchedData} 
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
