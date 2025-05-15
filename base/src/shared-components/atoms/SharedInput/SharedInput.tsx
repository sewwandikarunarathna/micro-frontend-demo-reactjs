import { Input } from "antd";
import { ReactNode } from "react";

type Props = {
  size?: "small"| "middle" | "large";
  style?: any;
  width?: number;
  inputType?: string;
  className?: string;
  defaultValue?: string | number | any;
  value?: string | number | any;
  onChange?: any;
  readOnly?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
};


const SharedInput = (props: Props) => {
  return (
    <>
     {
       props.inputType == 'password' ?
       <Input.Password /> : 
       <Input
       readOnly={props.readOnly}
        size={props.size ?? "small"}
          defaultValue={props.defaultValue}
          value={props.value}
          style={{...props.style, width: props.width}}
          className={props.className}
          onChange={props.onChange}
          prefix={props.prefix}
          suffix={props.suffix}
        />
     }
    </>
  );
};

export default SharedInput;
