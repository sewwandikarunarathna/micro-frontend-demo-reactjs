import { Avatar, Button } from "antd";
import { ReactNode } from "react";

type Props = {
  children: any;
  size?: "small"| "large";
  style?: any;
  className?: string;
  gap?: number;
  onClick?: any;
};


const SharedAvatar = (props: Props) => {
  return (
    <>
      <Avatar
        onClick={props.onClick}
        className={props.className}
        size={props.size}
        gap={props.gap}
        style={ props.style }
      >
        {props.children}
        </Avatar>
    </>
  );
};

export default SharedAvatar;
