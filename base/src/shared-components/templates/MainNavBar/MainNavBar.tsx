import AntIcons from "../../../utils/AntIcons";
import SharedButton from "../../atoms/SharedButton";
import SharedBreadCrumb from "../../atoms/SharedBreadCrumb";
import SharedImage from "../../atoms/SharedImage";
import SharedNotification from "../../molecules/SharedNotification";
import { notification } from "antd";

const MainNavBar = () => {;
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

  return (
    <div className="flex w-full justify-between items-center bg-gray-100 border-b-2 border-gray-300 shadow-sm">
      <div className="flex justify-start items-center gap-2 px-4 py-2">
        <SharedBreadCrumb
          items={breadcrumbItems}
        />
      </div>
      <div className="flex flex-row justify-end items-center gap-2 px-4 py-2">
        <SharedButton
          type="text"
          size="small"
        className="!text-sm !text-blue-700 !font-medium mr-4"
        >
          ABC Ltd
        </SharedButton>
        <SharedNotification
        className=" hover:bg-gray-300"
        type="text"
        icon={AntIcons('BellIconFilled')()}
        message="Welcome to App!"
        notificationType="success"
        description="This is a notification message."
        showProgress={true}
        pauseOnHover={true}
        />
        <SharedButton
          type="text"
          icon={AntIcons("InfoCircleOutlined")()}
        ></SharedButton>
        <SharedImage
          className="rounded-full hover:cursor-pointer"
          onClick={() => console.log("image clicked")}
          width={30}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
    </div>
  );
};

export default MainNavBar;
