import { Form } from "antd";

type Props = {
  children: any;
  variant?: "borderless" | "outlined" | "filled" | "underlined";
  size?: "small" | "middle" | "large";
  layout?: 'horizontal' | 'inline' | 'vertical';
  style?: any;
  className?: string;
  onFinish?: any;
};

const SharedForm = (props: Props) => {
  const [form] = Form.useForm();
  return (
    <>
      <Form
        form={form}
        variant={props.variant}
        size={props.size}
        layout={props.layout}
        onFinish={props.onFinish}
        style={props.style}
        className={props.className}
      >
        {props.children}
      </Form>
    </>
  );
};

export default SharedForm;
