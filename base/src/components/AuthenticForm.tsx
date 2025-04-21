import { useActionState, useState } from "react";
import { Form, Input, Button, Alert, Checkbox } from "antd";
import SharedCard from "../shared-components/molecules/SharedCard";
// import {  useFormStatus } from "react-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import withAuth from "../utils/WithAuth";

const AuthenticForm = () => {
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState<any>({});

  const [message, submitAction, isPending] = useActionState(
    async (prevErrors: any, formData: any) => {
      // Server-side validation
      const errors: any = {};
      if (!formData.get("username")) errors.username = "Username required";
      if (!formData.get("email")?.match(/^\S+@\S+\.\S+$/)) {
        errors.email = "Invalid email format";
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors); // Update errors state
        return { type: "error", message: "Something wrong!" }; // Return error message
      }

      // Process valid data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitted:", Object.fromEntries(formData));
      setFormErrors({});
      return { type: "success", message: "Submitted!" }; // Return success message
    },
    { type: "", message: "" } // Initial state
  );

  //   const { pending } = useFormStatus();

  return (
    <SharedCard width={600} className="flex flex-col w-auto h-auto justify-start items-center mt-6 p-2 bg-amber-300">
      <h2 className="flex text-2xl font-bold mb-4 justify-center text-center">Authentication Form</h2>
      <p className="flex justify-center text-sm text-gray-500 mb-4">
        Please fill in the details below
      </p>
      <PerfectScrollbar>
      <Form
        form={form}
        variant="outlined"
        size="small"
        layout="horizontal"
        onFinish={async (values) => {
          // Convert AntD values to FormData
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value as string);
          });
          submitAction(formData);
        }}
        style={{ height: '200px', padding: '0px 12px', gap: 0 }}
      >
        {/* Username Field */}
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Required field" },
            { whitespace: true, message: "Cannot be just whitespace" },
          ]}
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
            { type: "email", message: "Please enter a valid email address" },
          ]}
          validateStatus={formErrors?.email ? "error" : ""}
          help={formErrors?.email}
        >
          <Input />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Required field" },
            { min: 4, message: "Password must be at least 4 characters" },
            { max: 8, message: "Password cannot exceed 8 characters" },
          ]}
          validateStatus={formErrors?.password ? "error" : ""}
          help={formErrors?.password}
        >
          <Input.Password />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Agreement checking field */}
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("You must accept the agreement")),
            },
          ]}
        >
          <Checkbox>I have read the agreement</Checkbox>
        </Form.Item>
        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isPending}>
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

      </PerfectScrollbar>
    </SharedCard>
  );
};

export default withAuth(AuthenticForm);
