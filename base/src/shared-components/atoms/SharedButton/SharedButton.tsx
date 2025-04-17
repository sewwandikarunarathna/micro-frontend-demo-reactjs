import { Button } from "antd";
import { ReactNode } from "react";

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
  icon?: ReactNode;
  className?: string;
  component?: any;
  disabled?: boolean;
  onClick?: any;
};

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
  component?: any;
  disabled?: boolean;
  onClick?: any;
};

const SharedButton = (props: AntProps) => {
  return (
    <>
      <Button
        type={props.type ?? 'default'}
        icon={props.icon}
        onClick={props.onClick}
        disabled={props.disabled}
        className={props.className}
        size={props.size}
        style={{
          fontSize: props.fontSize,
          width: props.width,
          height: props.height,
        }}
      />
      {/* <Button
      className={props.className}
      component={props.component}
      type={props.type}
      size={props.size}
      color={props.color}
      variant={props.variant ?? 'contained'}
      disabled={props.disabled}
      onClick={props.onClick}
      sx={{
        ':hover': {
          bgcolor: props.bgcolor,
        },
      }}
    >
      {props.children}
    </Button> */}
    </>
  );
};

export default SharedButton;
