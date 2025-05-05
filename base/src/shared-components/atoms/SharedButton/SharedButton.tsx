import { Button } from "antd";
type AntProps = {
  type?: "default" | "primary" | "dashed" | "link" | "text";
  size?: "small"| 'middle' | "large";
  variant?: "text" | "outlined" | "contained" | any;
  bgcolor?: string;
  icon?: any;
  fontSize?: string;
  width?: number;
  height?: number;
  className?: string;
  children?: any;
  component?: any;
  disabled?: boolean;
  onClick?: any;
};

const SharedButton = (props: AntProps) => {
  return (
    <>
      <Button
        type={props.type}
        icon={props.icon}
        onClick={props.onClick}
        disabled={props.disabled}
        className={props.className}
        size={props.size}
      >
        {props.children}
        </Button>
    </>
  );
};

export default SharedButton;
