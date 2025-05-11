import { Select } from "antd";

type Props = {
  size?: "small"| "middle" | "large";
  style?: any;
  width?: number;
  className?: string;
  onChange?: any;
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
        style={{...props.style, width: props.width}}
        className={props.className}
        onChange={props.onChange}
        options={props.options}
      />
    </>
  );
};

export default SharedSelect;
