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
  options?: any;
};


const SharedSelect = (props: Props) => {
  return (
    <>
     <Select
      size={props.size ?? "middle"}
        defaultValue={props.defaultValue ?? props.optionData[0]}
        style={props.style}
        onChange={props.onChange}
        options={props.options}
      />
    </>
  );
};

export default SharedSelect;
