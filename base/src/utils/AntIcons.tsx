import {
  DashboardOutlined as DashboardIcon,
  UsergroupAddOutlined as UsersIcon,
  UserOutlined as OneUserIcon,
  MessageOutlined as ChatIcon,
  CalendarOutlined as CalendarIcon,
  TableOutlined as TableIcon,
  CustomerServiceOutlined as SupportIcon,
  SettingOutlined as SettingsIcon,
  LayoutOutlined as AntLayoutIcon,
  LogoutOutlined as LogoutIcon,
  PlusOutlined as AddIcon,
  SaveOutlined as SaveIcon,
  ArrowLeftOutlined as PreviousIcon,
  ArrowRightOutlined as NextIcon,
  DeleteOutlined as DeleteIcon,
  SearchOutlined as SearchIcon,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { JSX } from "react";

const AntIcons = (iconName: string) => {
  const iconNameFromProps = iconName;

  const iconMap: Record<string, JSX.Element> = {
    DashboardIcon: <DashboardIcon />,
    UsersIcon: <UsersIcon />,
    OneUserIcon: <OneUserIcon />,
    ChatIcon: <ChatIcon />,
    CalendarIcon: <CalendarIcon />,
    TableIcon: <TableIcon />,
    SupportIcon: <SupportIcon />,
    SettingsIcon: <SettingsIcon />,
    AntLayoutIcon: <AntLayoutIcon />,
    LogoutIcon: <LogoutIcon />,
    SearchIcon: <SearchIcon />,
    AddIcon: <AddIcon />,
    SaveIcon: <SaveIcon />,
    PreviousIcon: <PreviousIcon />,
    NextIcon: <NextIcon />,
    DeleteIcon: <DeleteIcon />,
    MenuUnfoldOutlined: <MenuUnfoldOutlined />,
    MenuFoldOutlined: <MenuFoldOutlined />,
    InfoCircleOutlined: <InfoCircleOutlined />,
    BellIconFilled: <BellFilled />
  };
  
  const iconNames: string | any = {
    BellIconFilled: BellFilled
  };

  const getIconComponent = () => {
    if (iconMap[iconNameFromProps]) {
      return iconMap[iconNameFromProps];
    }
    // Check if the icon name is in the iconNames object
    if(iconNames[iconNameFromProps]) {     
      return iconNames[iconNameFromProps];
    }
    // Return a default icon or null if the icon is not found
    return null;
  };
  return getIconComponent;
};

export default AntIcons;
