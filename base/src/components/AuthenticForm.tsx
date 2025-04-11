import {useActionState, useState} from "react";
import { Form, Input, Button, Alert } from "antd";
// import {  useFormStatus } from "react-dom";

const AuthenticForm = () => {
  const [form] = Form.useForm();
    const [formErrors, setFormErrors] = useState<any>({});

  const [message, submitAction, isPending] = useActionState(
    async (prevErrors:any, formData:any) => {
      // Server-side validation
      const errors:any = {};
      if (!formData.get("username")) errors.username = "Username required";
      if (!formData.get("email")?.match(/^\S+@\S+\.\S+$/)) {
        errors.email = "Invalid email format";
      }
      if (Object.keys(errors).length > 0){
        setFormErrors(errors); // Update errors state
          return {type: "error", message: 'Something wrong!'}; // Return error message
      } 
      
      // Process valid data
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Submitted:", Object.fromEntries(formData));
      setFormErrors({})
      return {type: "success", message: 'Submitted!'}; // Return success message
    }, 
    {type: "", message: ''} // Initial state
  );

//   const { pending } = useFormStatus();

  return (
    <Form
      form={form}
      variant="outlined"
      size="small"
      layout="vertical"
      onFinish={async (values) => {
        // Convert AntD values to FormData
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        submitAction(formData);
      }}
    >
      {/* Username Field */}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Required field" }]}
        validateStatus={formErrors?.username ? "error" : ""}
        help={formErrors?.username}
      >
        <Input />
      </Form.Item>

      {/* Email Field */}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Required field" },
        //   { type: "email", message: "Invalid email format" }
        ]}
        validateStatus={formErrors?.email ? "error" : ""}
        help={formErrors?.email}
      >
        <Input />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          disabled={isPending}
        >
         {isPending ? "Submitting..." : "Submit"}
        </Button>
      </Form.Item>

      {/* Server Error Display */}
      {formErrors && Object.keys(formErrors).length > 0 && (
        <Alert
          message="Submission Errors"
          description={Object.values(formErrors).join(", ")}
          type="error"
          showIcon
        />
      )}
      {/* Success Message */}
        {message?.type === "success" ? (
            <Alert message={message.message} type="success" showIcon />
        ) : (
            <Alert message={message.message} type="error" showIcon />
        )}
    </Form>
  );
};

export default AuthenticForm;
