import { Button, Popover } from "antd";
import React from "react";

type Props = {
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | any;
  children: any;
  type?: "button" | "reset" | "submit";
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained" | any;
  bgcolor?: string;
  icon?: any;
  className?: string;
  title?: string;
  content?: any;
  component?: any;
  disabled?: boolean;
  open?: boolean;
  onClick?: any;
  onOpenChange?: any;
};

const ActionButtonPopover = (props: Props) => {
  return (
    <Popover 
    className="flex flex-col w-auto h-auto justify-start items-center p-2" 
    placement="bottomLeft" 
    title={props.title} 
    content={props.content}
    trigger="click"
    open={props.open}
    onOpenChange={props.onOpenChange}
    >
      {/* <Button onClick={props.onClick} icon={props.icon}></Button> */}
      {props.children}      
    </Popover>
  );
};

export default ActionButtonPopover;
