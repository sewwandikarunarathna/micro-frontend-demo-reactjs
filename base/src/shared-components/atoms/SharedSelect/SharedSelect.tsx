import { Avatar, Button, Select } from "antd";
import { ReactNode } from "react";

type Props = {
  size?: "small"| "middle" | "large";
  style?: any;
  className?: string;
  defaultValue?: string | number | any;
  gap?: number;
  onChange?: any;
  optionData?: any;
  options?: options[];
};

type options = {
  value: string, label: string 
};

const SharedSelect = (props: Props) => {
  return (
    <>
     <Select
      size={props.size ?? "small"}
        defaultValue={props.options?.[0]?.value ?? ""}
        style={props.style}
        className={props.className}
        onChange={props.onChange}
        options={props.options}
      />
    </>
  );
};

export default SharedSelect;
