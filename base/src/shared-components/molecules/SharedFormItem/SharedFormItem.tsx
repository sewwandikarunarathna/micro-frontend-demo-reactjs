import { Form } from "antd";

type Props = {
  children: any;
  initialValue?: any;
  label?: string;
  name?: string;
  validateStatus?: "" | "success" | "warning" | "error" | "validating" | undefined;
  help?: string;
  rules?: any[];
  dependencies?: any[];
  valuePropName?: string;
};

const SharedFormItem = (props: Props) => {
  return (
    <>
      <Form.Item
      initialValue={props.initialValue}
        label={props.label}
        name={props.name}
        dependencies={props.dependencies}
        rules={props.rules}
        validateStatus={props.validateStatus}
        help={props.help}
        valuePropName={props.valuePropName}
      >
        {props.children}
      </Form.Item>
    </>
  );
};

export default SharedFormItem;
