import { Menu } from "antd";
import React from "react";

type Props = {
    theme?: 'dark' | 'light';
  mode?: "horizontal" | "vertical" | "inline";
  bgColor?: string;
  className?: string;
  onClick?: any;
  items?: any[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  style?: React.CSSProperties;
};

const SharedMenu = (props: Props) => {
  return (
    <>
      <Menu
      theme={props.theme}
        mode={props.mode ?? "inline"}
        defaultSelectedKeys={props.defaultSelectedKeys}
        defaultOpenKeys={props.defaultOpenKeys}
        style={{ ...props.style, borderRight: 0, background: props.bgColor }}
        items={props.items}
        className={props.className}
      />
    </>
  );
};

export default SharedMenu;
