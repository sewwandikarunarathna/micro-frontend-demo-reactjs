import { Tag } from "antd";

type Props = {
  color?: "success" | "processing" | "error" | "default" | "warning" | string;
  children: string;
  className?: string;
  icon?: any;
};

const SharedTag = (props: Props) => {
  return (
    <>
      <Tag
        color={props.color}
        icon={props.icon}
        className={props.className}
      >{props.children}</Tag>
    </>
  );
};

export default SharedTag;
