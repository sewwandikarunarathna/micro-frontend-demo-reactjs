import { Breadcrumb } from "antd";

type Props = {
  items: any[];
  size?: "small" | "large";
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
