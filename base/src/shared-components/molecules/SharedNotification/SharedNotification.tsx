import { Button, notification } from "antd";
import { ReactNode } from "react";

type Props = {
  type?: "default" | "primary" | "dashed" | "link" | "text";
  icon?: any;
  duration?: number;
  className?: string;
  message?: string;
  description?: string;
  notificationType?: "success" | "info" | "warning" | "error";
  buttonName?: string | ReactNode;
  children?: any;
  disabled?: boolean;
  pauseOnHover?: boolean;
  showProgress?: boolean;
  onClick?: any;
};

const SharedNotification = (props: Props) => {
  const [api, contextHolder] = notification.useNotification();
  const notifyObject = {
    message: props.message,
    description: props.description,
    duration: props.duration,
    showProgress: props.showProgress,
    pauseOnHover: props.pauseOnHover,
  };
  const openNotification = () => {
    if (props.notificationType) {
      api[props.notificationType](notifyObject);
    } else {
      api.open(notifyObject);
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        disabled={props.disabled}
        icon={props.icon}
        type={props.type}
        className={props.className}
        onClick={openNotification}
      >
        {props.buttonName}
      </Button>
    </>
  );
};

export default SharedNotification;
