import { Avatar, Button, Checkbox } from "antd";
import { ReactNode } from "react";

type Props = {
  className?: string;
  checked?: boolean;
  onChange?: any;
  onClick?: any;
};


const SharedCheckbox = (props: Props) => {
  return (
    <>
      <Checkbox
            checked={props.checked}
            onChange={props.onChange}
            onClick={props.onClick}
          />
    </>
  );
};

export default SharedCheckbox;
