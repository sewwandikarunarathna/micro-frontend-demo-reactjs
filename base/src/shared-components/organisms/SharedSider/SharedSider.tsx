import { Layout } from "antd";

const { Sider } = Layout;

type Props = {
  children?: any;
  bgColor?: string;
  className?: string;
  collapsed?: boolean;
  onCollapse?: any;
  collapsedWidth?: number;
  width?: number;
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | undefined;
};

const SharedSider = (props: Props) => {
  return (
    <>
      <Sider
        className={props.className}
        trigger={null}
        collapsible
        style={{ background: props.bgColor }}
        collapsed={props.collapsed}
        onCollapse={props.onCollapse}
        collapsedWidth={props.collapsedWidth}
        width={props.width}
        breakpoint={props.breakpoint}
      >
        {props.children}
      </Sider>
    </>
  );
};

export default SharedSider;
