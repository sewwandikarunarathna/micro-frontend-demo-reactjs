import { Avatar, Breadcrumb, Button } from "antd";
import { ReactNode } from "react";

type Props = {
  items: any[];
  size?: "small"| "large";
  style?: any;
  separator?: string;
  className?: string;
  gap?: number;
  onClick?: any;
};


const SharedBreadCrumb = (props: Props) => {
  return (
    <>
      <Breadcrumb
    items={props.items}
    separator={props.separator ?? ">"}
    className={props.className}
  />
    </>
  );
};

export default SharedBreadCrumb;
