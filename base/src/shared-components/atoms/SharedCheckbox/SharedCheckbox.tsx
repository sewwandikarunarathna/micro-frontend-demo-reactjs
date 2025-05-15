import { Checkbox } from "antd";

type Props = {
  className?: string;
  checked?: boolean;
  onChange?: any;
  children?: any;
  onClick?: any;
};

const SharedCheckbox = (props: Props) => {
  return (
    <>
      <Checkbox
        checked={props.checked}
        onChange={props.onChange}
        onClick={props.onClick}
      >
        {props.children}
      </Checkbox>
    </>
  );
};

export default SharedCheckbox;
